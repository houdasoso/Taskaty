// Task controller - CRUD for tasks scoped to authenticated user
const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description = '', deadline, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await Task.create({
      user: req.userId,
      title,
      description,
      deadline,
      status
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// Get tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Update specific task (only owner can update)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;

    const updated = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, deadline, status },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Task not found or not authorized' });
    res.json(updated);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete task (only owner)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Task not found or not authorized' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
