const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel');

router.get('/', async (req, res) => {
  try {
    const allActions = await actions.get();
    res.status(200).json(allActions);
  } catch (error) {
    res.status(500).json({ message: "Actions could not be retrieved." });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await actions.get(req.params.id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ message: "Action could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.project_id) {
      return res.status(400).json({ message: "Please enter a project ID." });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: "Please enter a description." });
    }
    if (!req.body.notes) {
      return res.status(400).json({ message: "Please enter some notes." });
    }
    if (req.body.description.length > 128) {
      return res.status(400).json({ message: "Description must be less than 128 characters." });
    }
    const newAction = await actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ message: "Action could not be saved." })
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.body.project_id) {
      return res.status(400).json({ message: "Please enter a project ID." });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: "Please enter a description." });
    }
    if (!req.body.notes) {
      return res.status(400).json({ message: "Please add at least an empty string for notes." });
    }
    if (req.body.description.length > 128) {
      return res.status(400).json({ message: "Description must be less than 128 characters." });
    }
    const editedAction = await actions.insert(req.body);
    res.status(200).json(editedAction);
  } catch (error) {
    res.status(500).json({ message: "Action could not be edited." })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const action = await actions.remove(req.params.id);
    if (action === 0) {
      res.status(404).json({ message: "Action does not exist." });
      return;
    }
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ message: "Action could not be deleted." });
  }
});

module.exports = router;
