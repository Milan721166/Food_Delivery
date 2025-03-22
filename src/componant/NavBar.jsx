import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/NavBar.css';
import dishes from '../services/api.json';
import { UserContext } from '../context/UserContext';

function NavBar({ isDarkMode, toggleTheme, cart }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { user, setUser } = useContext(UserContext);

  // Handle Admin Login click
  const handleAdminLoginClick = () => {
    navigate('/admin-login');
  };

  // Handle Cart Icon click
  const handleCartClick = () => {
    navigate('/cart');
  };

  // Handle User Login click
  const handleUserLoginClick = () => {
    navigate('/user-login');
  };

  // Handle User Registration click
  const handleUserRegisterClick = () => {
    navigate('/user-register');
  };

  // Handle Restaurant Login click
  const handleRestaurantLoginClick = () => {
    navigate('/restaurant-login');
  };

  // Handle Profile Click
  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile dashboard
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // Clear user context
    navigate('/'); // Redirect to home page
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter dishes based on the search query
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredDishes = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredDishes);
    }
  };

  // Handle Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/dish/${searchResults[0].id}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* Brand Logo with Sample Image */}
        <a className="navbar-brand" href="/">
          <img
            src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png"
            alt="FoodieExpress Logo"
            className="d-inline-block align-text-top me-2"
          />
          FoodieExpress
        </a>

        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Additional Elements */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Main Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Order Online
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search food..."
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Display Search Results */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((dish) => (
                <div
                  key={dish.id}
                  className="search-result-item"
                  onClick={() => navigate(`/dish/${dish.id}`)}
                >
                  <img src={dish.imageUrl} alt={dish.name} className="search-result-image" />
                  <div className="search-result-details">
                    <h5>{dish.name}</h5>
                    <p>${dish.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cart Icon */}
          <div className="nav-item me-3">
            <a
              className="nav-link"
              href="#"
              onClick={handleCartClick}
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="badge bg-danger ms-1">{cart.length}</span>
            </a>
          </div>

          {/* Theme Toggle Button */}
          <div className="nav-item me-3">
            <button
              className="btn btn-outline-secondary theme-toggle"
              onClick={toggleTheme}
            >
              {isDarkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
          

          {/* User Dropdown */}
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
              {user && <span className="ms-2">{user.userName}</span>}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              {user ? (
                // If user is logged in, show Profile and Logout
                <>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleProfileClick}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                // If user is logged out, show Login and Registration options
                <>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleUserLoginClick}>
                      User Login
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleUserRegisterClick}>
                      User Registration
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleAdminLoginClick}>
                      Admin Login
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleRestaurantLoginClick}>
                      Restaurant Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;