const express = require('express');
const router = express.Router();
const projects = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const allProjects = await projects.get();
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ message: "Projects could not be retrieved."});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await projects.get(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Project could not be retrieved."});
  }
});

router.get('/:id/actions', async (req, res) => {
  try {
    const actions = await projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: "Actions could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Please enter a name." });
    }
    if (!req.body.description) {
      res.status(400).json({ message: "Please enter a description." });
    }
    if (req.body.name.length > 128) {
      res.status(400).json({ message: "Name must be less than 128 characters." });
    }
    const newProject = await projects.insert(req.body);
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "The project could not be saved." });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Please enter a name." });
    }
    if (!req.body.description) {
      res.status(400).json({ message: "Please enter a description." });
    }
    if (req.body.name.length > 128) {
      res.status(400).json({ message: "Name must be less than 128 characters." });
    }
    const project = await projects.update(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Project could not be saved." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await projects.remove(req.params.id);
    console.log(project);
    if (project === 0) {
      res.status(404).json({ message: "Project does not exist." });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Project could not be deleted." });
  }
});


module.exports = router;
