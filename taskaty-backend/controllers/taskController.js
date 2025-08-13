// Task controller - CRUD, with filtering/sorting/pagination support
const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description = '', deadline, status, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await Task.create({
      user: req.userId,
      title,
      description,
      deadline,
      status,
      priority
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// GET tasks with filters and pagination & sorting
// Query params: search, status, priority, sort (field), order (asc/desc), page, limit
exports.getTasks = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const q = { user: req.userId };

    if (status && status !== 'all') q.status = status;
    if (priority && priority !== 'all') q.priority = priority;
    if (search) q.title = { $regex: search, $options: 'i' };

    const pageNum = Math.max(1, parseInt(page, 10));
    const lim = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * lim;

    const sortOption = {};
    sortOption[sort] = order === 'asc' ? 1 : -1;

    const [items, total] = await Promise.all([
      Task.find(q).sort(sortOption).skip(skip).limit(lim).lean(),
      Task.countDocuments(q)
    ]);

    const pages = Math.ceil(total / lim) || 1;

    res.json({
      items,
      meta: {
        total,
        page: pageNum,
        limit: lim,
        pages
      }
    });
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Update task (owner only)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, status, priority } = req.body;

    const updated = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, deadline, status, priority },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Task not found or not authorized' });
    res.json(updated);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete task (owner only)
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
