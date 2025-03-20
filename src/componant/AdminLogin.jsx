import React from 'react';
import './css/AdminLogin.css'; 
function AdminLogin() {
  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1 className="admin-login-title">Admin Login</h1>
        <form className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>
        <p className="admin-login-footer">
          Forgot your password? <a href="/reset-password">Reset here</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;