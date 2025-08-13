import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser, theme, setTheme }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Taskaty</Link>
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-outline-light me-2" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          {user ? (
            <>
              <span className="text-white me-3">Hi, {user.name || user.email}</span>
              <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-sm btn-outline-light" to="/auth">Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
