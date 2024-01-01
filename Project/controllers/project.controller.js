const Project = require("../dataModels/Project.model");
const User = require("../dataModels/User.model");

const createProject = async (req, res) => {
  try {
    // Extract project information from the request
    const { title, description, images, audio } = req.body;
    const userEmail = req.user.email;             // Authenticated user

    console.log("Creating project:", title, description, "User:", userEmail);

    const user = await User.findOne({ email: userEmail });        // Find the user by email

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const project = new Project({
      title,
      description,
      user_id: user._id,
      images: images || [], 
      audio: audio || [],
    });

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
    const { id, title, description, images, audio } = req.body;

    console.log("Updating project:", id, "Title:", title);

    const project = await Project.findById(id);       // Find the project by ID

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const userEmail = req.user.email;      // Authenticated user

    const user = await User.findOne({ email: userEmail });        // Find the user by email

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the project belongs to the authenticated user
    if (project.user_id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to update this project' });
    }

    // Update project properties
    if (title) {
      project.title = title;
    }

    if (description) {
      project.description = description;
    }

    if (images) {
      project.images = images; 
    }

    if (audio) {
      project.audio = audio; 
    }

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
    const { id } = req.params;

    console.log("Deleting project:", id);

    // Find the project by ID
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const userEmail = req.user.email;      // Authenticated user

    const user = await User.findOne({ email: userEmail });        // Find the user by email

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the project belongs to the authenticated user
    if (project.user_id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to delete this project' });
    }

    await project.deleteOne();            // Delete

    console.log("Project deleted:", id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: error.message });
  }
};


const getProjectsByUser = async (req, res) => {
    try {

      const userEmail = req.user.email;       // Authenticated user

      const user = await User.findOne({ email: userEmail });      // Find the user by email

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const projects = await Project.find({ user_id: user._id });

      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: error.message });
    }
};


const appendImagesToProject = async (req, res) => {
  const { projectId } = req.params;
  const { files } = req;
  const authenticatedUser = req.user;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.user_id.toString() !== authenticatedUser._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to update this project' });
    }

    // Append the new images to the existing images array
    project.images = project.images.concat(files.map((file) => file.filename));

    await project.save();

    res.json({ message: "Images appended to the project successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const appendAudioToProject = async (req, res) => {
  const { projectId } = req.params;
  const { files } = req;
  const authenticatedUser = req.user;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.user_id.toString() !== authenticatedUser._id.toString()) {
      return res.status(403).json({ error: 'You do not have permission to update this project' });
    }

    // Append the new audio files to the existing audio array
    project.audio = project.audio.concat(files.map((file) => file.filename));

    await project.save();

    res.json({ message: "Audio files appended to the project successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser,
  appendImagesToProject,
  appendAudioToProject,
};