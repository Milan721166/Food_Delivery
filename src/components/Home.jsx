import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
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
        <div>
            <h1>Available Dishes</h1>
            <ul>
                {dishes.map(dish => (
                    <li key={dish.id}>{dish.name} - ${dish.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
