import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const FruitList = () => {

    const [fruits, setFruits] = useState([]);

    // using use effect to get run fetching data once
    useEffect(() => {
      // Using json placeholder to get fake user json data
      axios.get('/api/fruits')
        .then(response => setFruits(response.data));
    }, [])

    return (
        <div>
            <h1>Fruit list here</h1>
            <ul style={{ listStyle:"none" }}>{fruits.map((fruit) => {
                return (
                  <li key={fruit._id}>
                    <Link to={`/fruit/${fruit._id}`}>{fruit.name}</Link> (
                    {fruit.amount}) - {fruit.info}
                  </li>
                );
            })}</ul>
        </div>
    )
}

export default FruitList
