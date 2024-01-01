const express = require("express");
const router = express.Router();
const {
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser,
  appendImagesToProject,
  appendAudioToProject
} = require("../controllers/project.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");
const {uploadImage, uploadAudioFile} = require("../middlewares/media.middleware")


// Create a new project
router.post("/projects", ensureAuthenticated, createProject);

// Update an existing project
router.patch("/projects/:id", ensureAuthenticated, updateProject);

// Delete an existing project
router.delete("/projects/:id", ensureAuthenticated, deleteProject);

// Get a user's projects
router.get("/projects/user", ensureAuthenticated, getProjectsByUser);

// Append images to a project
router.post("/projects/:projectId/images", ensureAuthenticated, uploadImage.array('images', 5), appendImagesToProject);

// Append audio files to a project
router.post("/projects/:projectId/audio", ensureAuthenticated, uploadAudioFile.array('audio', 5), appendAudioToProject);

module.exports = router;  