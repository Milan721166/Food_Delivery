import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import './css/Home.css'; // Import custom CSS

function Home({ handleAddToCart }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:8080/products')
      .then(response => {
        setDishes(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="menu-container">
      <h1 className="menu-title">Restaurants Near You</h1>
      <div className="card-grid">
        {dishes.map((dish) => (
          <Link to={`/products/${dish.id}`} key={dish.id} className="card-link">
            <div className="card">
              <img src={dish.imageUrl} alt={dish.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{dish.name}</h3>
                <p className="card-description">{dish.description}</p>
                <p className="card-price">${dish.price.toFixed(2)}</p>
                <div className="card-buttons">
                  <button className="success" onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when adding to cart
                    handleAddToCart(dish);
                  }}>
                    Add to Cart
                  </button>
                  <button className="card-button">Order Now</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;