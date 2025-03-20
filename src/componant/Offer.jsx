import React, { useState, useEffect } from 'react';
import './css/Offer.css';

const Offer = () => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating an API call
    const fetchOffer = async () => {
      try {
        // Mock API response with setTimeout to simulate a delay
        setTimeout(() => {
          // Mock response data (this would normally come from an API)
          const offerData = {
            title: "Exclusive 50% Off on Your First Order!",
            description: "Get 50% off your first order with us. Enjoy delicious food with great savings. Limited time offer!",
            ctaText: "Claim Your Discount",
            ctaLink: "https://www.example.com/claim-discount",
            isActive: true,
            discountPercentage: 50,
            colors: {
              primary: "#ff4757",
              secondary: "#ff6b81",
              accent: "#2ed573"
            },
            marqueeText: "Hurry up! Offer ends soon!"
          };
          setOffer(offerData);
          setLoading(false);
        }, 1500); // Simulate a 1.5-second delay for the API call
      } catch (err) {
        setError(err.message || 'Failed to load offer');
        setLoading(false);
      }
    };

    fetchOffer();
  }, []);

  if (loading) {
    return (
      <div className="offer-skeleton">
        <div className="skeleton-content"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (!offer || !offer.isActive) return null;

  return (
    <div 
      className="offer-container"
      style={{
        '--offer-primary': offer.colors?.primary || '#ff4757',
        '--offer-secondary': offer.colors?.secondary || '#ff6b81',
        '--offer-accent': offer.colors?.accent || '#2ed573',
      }}
    >
      <div className="offer-content">
        <h2 className="offer-title">{offer.title}</h2>
        <p className="offer-description">{offer.description}</p>
        <button 
          className="offer-button"
          onClick={() => window.location.href = offer.ctaLink}
        >
          {offer.ctaText}
          {offer.discountPercentage && (
            <span className="discount-badge">
              {offer.discountPercentage}% OFF
            </span>
          )}
        </button>
      </div>
      <div className="offer-marquee">
        {Array(4).fill(offer.marqueeText).join(' • ')}
      </div>
    </div>
  );
};

export default Offer;
