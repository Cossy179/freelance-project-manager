const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projects');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getProjects)
  .post(protect, createProject);

router.route('/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
