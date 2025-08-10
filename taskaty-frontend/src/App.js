import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import api from './utils/api';

// App-level: tries to load user (me) on start if token exists
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

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

  if (checking) {
    return <div className="container mt-5">Checking session...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
