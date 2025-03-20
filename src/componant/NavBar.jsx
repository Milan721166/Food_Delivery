import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/NavBar.css'; // Import custom CSS
import dishes from '../services/api.json'; // Import the JSON data

function NavBar({ isDarkMode, toggleTheme, cart }) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results

  // Handle Admin Login click
  const handleAdminLoginClick = () => {
    navigate('/admin-login'); // Navigate to the Admin Login page
  };

  // Handle Cart Icon click
  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the Cart page
  };

  // Handle User Login click
  const handleUserLoginClick = () => {
    navigate('/user-login'); // Navigate to the User Login page
  };

  // Handle User Registration click
  const handleUserRegisterClick = () => {
    navigate('/user-register'); // Navigate to the User Registration page
  };

  // Handle Restaurant Login click
  const handleRestaurantLoginClick = () => {
    navigate('/restaurant-login'); // Navigate to the Restaurant Login page
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter dishes based on the search query
    if (query.trim() === '') {
      setSearchResults([]); // Clear results if the query is empty
    } else {
      const filteredDishes = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredDishes); // Update search results
    }
  };

  // Handle Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Navigate to the first search result (or a search results page)
      navigate(`/dish/${searchResults[0].id}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* Brand Logo with Sample Image */}
        <a className="navbar-brand" href="#">
          <img
            src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png" // Custom logo URL
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
              <a className="nav-link active" aria-current="page" href="#">
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
              onClick={handleCartClick} // Navigate to the Cart page
            >
              <i className="fas fa-shopping-cart"></i> {/* Font Awesome icon */}
              <span className="badge bg-danger ms-1">{cart.length}</span> {/* Cart count */}
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
              <i className="fas fa-user"></i> {/* Font Awesome icon */}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;