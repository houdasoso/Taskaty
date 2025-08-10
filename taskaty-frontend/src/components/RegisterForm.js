import React, { useState } from 'react';
import api from '../utils/api';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Regular registration (optional because login auto-registers)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await api.post('/auth/register', { name, email, password });
      alert('Registered – now you can login (or use the Login form which auto-registers)');
      setName(''); setEmail(''); setPassword('');
    } catch (err) {
      console.error('Register failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="card p-4 shadow">
      <h4>Register (optional)</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="mb-2">
          <input className="form-control" type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" type="password" required placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
