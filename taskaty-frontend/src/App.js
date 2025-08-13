import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/TaskList'; // Home is TaskList in this simplified layout
import AuthPage from './components/LoginForm';
import api from './utils/api';
import TaskForm from './components/TaskForm';

// App does:
// - Load user profile if token exists
// - Provide theme toggle and pass user to components
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) { setChecking(false); return; }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.warn('Token invalid or server unreachable');
        localStorage.removeItem('token');
      } finally {
        setChecking(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (checking) return <div className="container mt-5">Checking session...</div>;

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} theme={theme} setTheme={setTheme} />
      <div className="container mt-4">
        <Routes>
          <Route path="/auth" element={<AuthPage onAuth={(u) => setUser(u)} />} />
          <Route path="/" element={user ? (
            <>
              <div className="row">
                <div className="col-md-4"><TaskForm /></div>
                <div className="col-md-8"><Home /></div>
              </div>
            </>
          ) : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
