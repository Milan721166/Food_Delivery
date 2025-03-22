import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/UserRegister.css'; // Import custom CSS

function UserRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  // Function to collect live location
  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setError('Unable to fetch your location. Please enter your address manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !password || !phone || !dob) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: name,
          email,
          mobNum: phone,
          password,
          address, // Include address
          dob, // Include dob
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/user-login'); // Redirect to login page after successful registration
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error); // Debug: Log error
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="user-register-container">
      <div className="user-register-card">
        <h2 className="user-register-title">User Registration</h2>
        {error && <div className="user-register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="user-register-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address 
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="button"
              className="location-button"
              onClick={getLiveLocation}
            >
              Use My Current Location
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="form-label">
              Date of Birth (Extra : Discount On Your Birth Day)
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="user-register-button">
            Register
          </button>
        </form>
        <p className="user-register-login-text">
          Already have an account? <a href="/user-login" className="login-link">Login here</a>.
        </p>
      </div>
    </div>
  );
}

export default UserRegister;