import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // On submit: POST /auth/login (auto-registers if user doesn't exist),
  // store token and update parent user state.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // fetch profile
      const me = await api.get('/auth/me');
      setUser(me.data);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
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
  );
}
