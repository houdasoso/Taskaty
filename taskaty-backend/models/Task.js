// Task model - linked to user
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ['pending','in progress','completed'],
    default: 'pending'
  },
  // optional priority (for sorting)
  priority: {
    type: String,
    enum: ['low','medium','high'],
    default: 'medium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
