import React, { useEffect, useCallback, useState } from 'react';
import api from '../utils/api';

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch tasks failed:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        // token invalid - clear and reload
        localStorage.removeItem('token');
        window.location.href = '/auth';
      }
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Delete failed');
    }
  };

  const handleEdit = async (task) => {
    // simple prompt-based editing (quick). You can replace with modal/form.
    const title = prompt('New title', task.title);
    if (!title) return;
    try {
      await api.put(`/tasks/${task._id}`, { ...task, title });
      fetchTasks();
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      alert('Update failed');
    }
  };

  return (
    <div className="row">
      {tasks.length === 0 && <div className="col-12 text-muted">No tasks yet.</div>}
      {tasks.map(t => (
        <div className="col-md-6" key={t._id}>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{t.title}</h5>
              <p className="card-text">{t.description || <i>No description</i>}</p>
              <p className="mb-1"><strong>Status:</strong> {t.status}</p>
              {t.deadline && <p className="mb-2"><strong>Deadline:</strong> {new Date(t.deadline).toLocaleDateString()}</p>}
              <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEdit(t)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(t._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
