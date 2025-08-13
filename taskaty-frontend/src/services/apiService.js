import api from '../utils/api';

// auth
export const register = (data) => api.post('/auth/register', data).then(r => r.data);
export const login = (data) => api.post('/auth/login', data).then(r => r.data);
export const me = () => api.get('/auth/me').then(r => r.data);

// tasks
export const createTask = (data) => api.post('/tasks', data).then(r => r.data);
export const getTasks = (query = '') => 
  api.get(`/tasks${query ? `?${query}` : ''}`).then(r => r.data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data).then(r => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(r => r.data);
