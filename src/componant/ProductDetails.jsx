import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch product details from the backend API
            axios.get(`http://localhost:8080/products/${id}`)
                .then(response => {
                    if (response.data) {
                        setProduct(response.data); // Update state with fetched product data
                    } else {
                        setError('Product not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                    setError('Error fetching product details.');
                });
        } else {
            setError('Product ID is undefined.');
        }
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-details-container">
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductDetails;
