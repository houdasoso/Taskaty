// axios instance to reuse in all API calls

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
});

// Automatically attach token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
