const Project = require("../dataModels/Project.model");

const createProject = async (req, res) => {
  try {
    // Extract project information from the request
    const { title, description } = req.body;
    const owner = req.user._id; 

    console.log("Creating project:", title, description, "Owner:", owner);

    // Create a new project
    const project = new Project({
      title,
      description,
      owner,
    });

    // Save the project to the database
    const savedProject = await project.save();

    console.log("Project created:", savedProject);

    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    // Extract project information from the request
    const { title, description } = req.body;
    const projectId = req.params.id;

    console.log("Updating project:", projectId, "Title:", title);

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update project properties
    if (title) {
      project.title = title;
    }

    if (description) {
      project.description = description;
    }

    // Save the updated project
    const updatedProject = await project.save();

    console.log("Project updated:", updatedProject);

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: error.message });
  }
};


const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    console.log("Deleting project:", projectId);

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the user is authorized to delete the project
    if (project.owner.toString() !== req.user._id) {
      return res.status(403).json({ error: "You are not authorized to delete this project" });
    }

    // Delete the project
    await project.deleteOne();

    console.log("Project deleted:", projectId);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: error.message });
  }
};

const getProjectsByUser = async (req, res) => {
    try {
      // Fetch projects by the user's ID
      const userId = req.user._id; // Assuming you have user information in req.user after authentication
      const projects = await Project.find({ owner: userId });
  
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: error.message });
    }
};


module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser,
};
