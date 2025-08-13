import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

// Login form: uses POST /auth/login which auto-registers if user doesn't exist.
// On success stores token and fetches user profile.
export default function LoginForm({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const me = await api.get('/auth/me');
      if (onAuth) onAuth(me.data);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h4>Login (auto-register if new)</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input className="form-control" type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input className="form-control" type="password" required placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-100">Login / Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
