// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from API
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  // Delete task and refresh
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
