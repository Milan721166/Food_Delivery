import React, { useEffect, useState } from 'react';
import './css/Category.css'; // Import the CSS file

const Category = () => {
  const [categories, setCategories] = useState([]);

  // Mock data for categories (replace with API fetch if needed)
  useEffect(() => {
    const mockCategories = [
      { id: 1, name: 'Biryani', imageUrl: 'https://cdn.gintaa.com/food-listings/category/biryani.png' },
      { id: 2, name: 'Momo', imageUrl: 'https://cdn.gintaa.com/food-listings/category/momo.png' },
      { id: 3, name: 'South Indian', imageUrl: 'https://cdn.gintaa.com/food-listings/category/sothindian.png' },
      { id: 4, name: 'Starters', imageUrl: 'https://cdn.gintaa.com/food-listings/category/starter.png' },
      { id: 5, name: 'Main Course', imageUrl: 'https://cdn.gintaa.com/food-listings/category/main-course.png' },
      { id: 6, name: 'Appetizers', imageUrl: 'https://cdn.gintaa.com/food-listings/category/Appetizers.png' },
      { id: 7, name: 'Mughlai', imageUrl: 'https://cdn.gintaa.com/food-listings/category/mughlai.png' },
      { id: 8, name: 'North Indian', imageUrl: 'https://cdn.gintaa.com/food-listings/category/northindian.png' },
    ];
    setCategories(mockCategories);
  }, []);

  return (
    <div className="category-container">
      <h2>What is on your mind?</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <img src={category.imageUrl} alt={category.name} className="category-image" />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;