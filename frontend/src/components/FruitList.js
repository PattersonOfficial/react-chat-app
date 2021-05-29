import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const FruitList = () => {

    const [fruits, setFruits] = useState([]);

    const [fruitSearch, setFruitSearch] = useState('')

    // using use effect to get run fetching data once
    useEffect(() => {
      // Using json placeholder to get fake user json data
      axios.get('/api/fruits')
        .then(response => setFruits(response.data));
    }, [])

    return (
      <div>
        <h1>Fruit list here</h1>

        <div class='col-md-8'>
          <br />
          <input
            type='text'
            placeholder='Search for fruits'
            class='form-control'
            onChange={(e) => {
              setFruitSearch(e.target.value);
            }}
            style={{ margin: '20px' }}
          />
          <br />
        </div>

        <ul style={{ listStyle: 'none' }}>
          {fruits.filter(fruit => {
            if (fruit.name.toLowerCase().includes(fruitSearch.toLowerCase())) {
              return fruit
            }
          }).map((fruit) => {
            return (
              <li key={fruit._id}>
                <Link to={`/fruit/${fruit._id}`}>{fruit.name}</Link> (
                {fruit.amount}) - {fruit.info}  [Added By {fruit.addedBy}]
              </li>
            );
          })}
        </ul>
      </div>
    );
}

export default FruitList
