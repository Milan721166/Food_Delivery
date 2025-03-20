import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/UserLogin.css'; // Import custom CSS

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Simulate login logic (replace with actual API call)
    if (email === 'user@example.com' && password === 'password') {
      navigate('/'); // Redirect to home page after successful login
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <h2 className="user-login-title">User Login</h2>
        {error && <div className="user-login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="user-login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="user-login-button">
            Login
          </button>
        </form>
        <p className="user-login-register-text">
          Don't have an account? <a href="/user-register" className="register-link">Register here</a>.
        </p>
      </div>
    </div>
  );
}

export default UserLogin;