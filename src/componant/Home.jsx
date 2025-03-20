import React from 'react';
import dishes from '../services/api.json'; // Import the JSON data
import './css/Home.css'; // Import custom CSS

function Home({ handleAddToCart }) {
  return (
    <div className="menu-container">
      <h1 className="menu-title">Restaurants Near You</h1>
      <div className="card-grid">
        {dishes.map((dish, index) => (
          <div key={index} className="card">
            <img src={dish.imageUrl} alt={dish.name} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{dish.name}</h3>
              <p className="card-description">{dish.description}</p>
              <p className="card-price">${dish.price.toFixed(2)}</p>
              <div className="card-buttons">
                <button className="success" onClick={() => handleAddToCart(dish)}>
                  Add to Cart
                </button>
                <button className="card-button">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;