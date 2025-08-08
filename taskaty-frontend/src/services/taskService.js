// src/services/taskService.js
import api from '../utils/api';

// Create a new task
export const createTask = async (taskData) => {
  const res = await api.post('/tasks', taskData);
  return res.data;
};

// Get all tasks
export const getTasks = async () => {
  const res = await api.get('/tasks');
  return res.data;
};

// Delete a task by ID
export const deleteTask = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};
