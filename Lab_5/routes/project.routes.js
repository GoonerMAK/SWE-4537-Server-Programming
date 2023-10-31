const express = require("express");
const router = express.Router();
const {
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser,
} = require("../controllers/project.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");

// Create a new project
router.post("/projects", ensureAuthenticated, createProject);

// Update an existing project
router.patch("/projects/:id", ensureAuthenticated, updateProject);

// Delete an existing project
router.delete("/projects/:id", ensureAuthenticated, deleteProject);

// Get a user's projects
router.get("/projects/user", ensureAuthenticated, getProjectsByUser);

module.exports = router;