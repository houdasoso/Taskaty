// controllers/taskController.js
const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Invalid task data' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
