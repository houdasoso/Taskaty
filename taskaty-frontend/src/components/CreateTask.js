// src/components/CreateTask.js
import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare task object
    const taskData = {
      title,
      description,
      status: 'pending',
    };

    try {
      // Call service to create task
      const newTask = await createTask(taskData);

      // Notify parent to refresh task list
      onTaskCreated(newTask);

      // Reset form
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTask;
