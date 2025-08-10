import React, { useState } from 'react';
import api from '../utils/api';

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('pending');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, status };
      if (deadline) payload.deadline = deadline;
      await api.post('/tasks', payload);
      setTitle(''); setDescription(''); setDeadline(''); setStatus('pending');
      if (onCreated) onCreated();
    } catch (err) {
      console.error('Create task failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Create failed');
    }
  };

  return (
    <form onSubmit={submit} className="card card-body mb-3">
      <div className="mb-2">
        <input className="form-control" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      </div>
      <div className="mb-2">
        <textarea className="form-control" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      <div className="row mb-2">
        <div className="col">
          <input className="form-control" type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} />
        </div>
        <div className="col">
          <select className="form-select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary">Add Task</button>
    </form>
  );
}
