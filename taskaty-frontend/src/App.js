// src/App.js
import React, { useState } from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

function App() {
  const [refresh, setRefresh] = useState(false);

  // Triggered when a task is created
  const handleTaskCreated = () => {
    setRefresh(!refresh); // toggle to refresh task list
  };

  return (
    <div className="App">
      <h1>Taskaty - Task Manager</h1>
      <CreateTask onTaskCreated={handleTaskCreated} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;
