import React, { useState } from 'react';
import './css/AdminLogin.css';

function AdminLogin({ theme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Login successful
      } else {
        alert(data.message); // Invalid credentials
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error');
    }
  };

  return (
    <div className={`admin-login-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="admin-login-box">
        <h1 className="admin-login-title">Admin Login</h1>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group animate-slide-in">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group animate-slide-in">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-button animate-fade-in">
            Login
          </button>
        </form>
        <p className="admin-login-footer animate-fade-in">
          Forgot your password? <a href="/reset-password">Reset here</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;