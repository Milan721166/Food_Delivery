import React from 'react';
import './css/CartPage.css'; // Import custom CSS for the cart page

function CartPage({ cart, handleCheckout }) {
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;