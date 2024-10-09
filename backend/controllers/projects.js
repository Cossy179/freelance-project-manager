const Project = require('../models/Project');

// Get all projects for a user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  const { title, description, lists } = req.body;

  try {
    const project = await Project.create({
      user: req.user.id,
      title,
      description,
      lists,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { title, description, lists } = req.body;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.lists = lists || project.lists;

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.remove();

    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
