// src/components/AuthForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function AuthForm({ mode = 'signin' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        setError('Please fill all fields.');
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else {
      if (!form.email || !form.password) {
        setError('Please enter email and password.');
        return;
      }
    }

    // LocalStorage mock auth (for now, no backend)
    if (isSignup) {
      const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
      if (users.some((u) => u.email === form.email)) {
        setError('Email already registered.');
        return;
      }
      users.push({ name: form.name, email: form.email, password: form.password });
      localStorage.setItem('localUsers', JSON.stringify(users));
      localStorage.setItem('authUser', JSON.stringify({ name: form.name, email: form.email }));
      navigate('/');
    } else {
      const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
      const user = users.find((u) => u.email === form.email && u.password === form.password);
      if (user) {
        localStorage.setItem('authUser', JSON.stringify({ name: user.name, email: user.email }));
        navigate('/');
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Create an account' : 'Sign in'}</h2>

        {isSignup && (
          <label className="auth-label">
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
        )}

        <label className="auth-label">
          <span>Email address</span>
          <input name="email" value={form.email} onChange={handleChange} type="email" />
        </label>

        <label className="auth-label">
          <span>Password</span>
          <input name="password" value={form.password} onChange={handleChange} type="password" />
        </label>

        {isSignup && (
          <label className="auth-label">
            <span>Confirm password</span>
            <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" />
          </label>
        )}

        {error && <div className="auth-error">{error}</div>}

        <button className="auth-button" type="submit" disabled={loading}>
          {isSignup ? 'Sign up' : 'Sign in'}
        </button>

        <div className="auth-footer">
          {isSignup ? (
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
          ) : (
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          )}
        </div>
      </form>
    </div>
  );
}
