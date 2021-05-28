import axios from 'axios';
import React, {useState } from 'react'

const AddFruit = () =>{

    const [fruit, setFruit] = useState({
        name: '',
        amount: 0,
        info: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`${fruit.name} - ${fruit.amount} - ${fruit.info}`)

        const newFruit = {
            name: fruit.name,
            amount: fruit.amount,
            info: fruit.info
        }

        axios.post('/api/fruits/', newFruit)
        .then(res => console.log(res.data))

        setFruit({
            name: '',
            amount: 0,
            info: ''
        })
    }

    const handleChange = (e) => {

        const {name, value} = e.target
        setFruit(oldfruit => {
            return {
                ...oldfruit,
                [name]: value
            }
        })
    }

    return (
      <div>
        <h1>Add fruits here</h1>

        <form onSubmit={handleSubmit}>
          <label>Fruit Name: </label>
          &nbsp;
          <input
            type='text'
            name='name'
            value={fruit.name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Amount: </label>
          &nbsp;
          <input
            type='text'
            name='amount'
            onChange={handleChange}
            value={fruit.amount}
          />
          <br />
          <br />
          <label>Info: </label>
          &nbsp;
          <input
            type='text'
            name='info'
            onChange={handleChange}
            value={fruit.info}
          />
          <br />
          <br />
          <input type='submit' value='Add fruit' />
        </form>
      </div>
    );
}

export default AddFruit
