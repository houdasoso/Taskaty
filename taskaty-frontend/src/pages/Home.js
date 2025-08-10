import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home({ user }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Tasks</h2>
        <div className="text-muted">Logged in as: {user?.email}</div>
      </div>

      <TaskForm onCreated={() => setRefresh(r => !r)} />
      <TaskList refresh={refresh} />
    </>
  );
}
