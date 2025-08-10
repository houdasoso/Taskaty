import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Taskaty</Link>
        <div>
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
