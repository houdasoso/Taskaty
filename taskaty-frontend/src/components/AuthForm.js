// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { register, login } from '../services/apiService';

const AuthForm = ({ onAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = isRegister ? { name, email, password } : { email, password };
      const res = isRegister ? await register(payload) : await login(payload);
      localStorage.setItem('token', res.token);
      onAuth(res.user);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Auth error');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card mt-5 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">{isRegister ? 'Register' : 'Login'}</h3>
          <form onSubmit={submit}>
            {isRegister && (
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary me-2" type="submit">{isRegister ? 'Register' : 'Login'}</button>
            <button type="button" className="btn btn-link" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
