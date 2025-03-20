import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./componant/NavBar";
import Home from "./componant/Home";
import Offer from "./componant/Offer";
import './App.css';
import Category from './componant/Category';
import CartPage from './componant/CartPage';
import AdminLogin from './componant/AdminLogin';
import UserLogin from './componant/UserLogin';
import UserRegister from './componant/UserRegister';
import RestaurantLogin from './componant/RestaurantLogin';
import RestaurantPage from './componant/RestaurantPage'; // Import the RestaurantPage component

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddToCart = (dish) => {
    setCart([...cart, dish]);
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    setCart([]);
    setShowCartPage(false);
  };

  return (
    <Router>
      <header>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} cart={cart} setShowCartPage={setShowCartPage} />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section aria-label="Special Offer">
                <Offer />
              </section>

              <section aria-label="Food Categories">
                <Category />
              </section>

              <main>
                <Home handleAddToCart={handleAddToCart} />
              </main>
            </>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/cart" element={<CartPage cart={cart} handleCheckout={handleCheckout} />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/restaurant-login" element={<RestaurantLogin />} />
        <Route path="/restaurant_page" element={<RestaurantPage />} /> {/* Add Route for Restaurant Page */}
      </Routes>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Barasat, Kolkata</p>
            <p>Kolkata, 700124</p>
            <p>Email: info@FoodieExpress.com</p>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Subscribe to Our Newsletter</h3>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 FoodieExpress. All rights reserved. Created By Milan & Malay</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;