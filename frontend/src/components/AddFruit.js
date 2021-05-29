import axios from 'axios';
import React, {useContext, useState } from 'react'
import { UserContext } from '../App';

const AddFruit = () =>{

  const { userData, setUserData } = useContext(UserContext)

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
          info: fruit.info,
          addedBy: userData.user.name
        };

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
      <div class='col-md-8'>
        <h1>Add fruits here</h1>

        <form onSubmit={handleSubmit}>
          <label>Fruit Name: </label>
          &nbsp;
          <input
            type='text'
            name='name'
            class='form-control'
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
            class='form-control'
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
            class='form-control'
            onChange={handleChange}
            value={fruit.info}
          />
          <br />
          <br />
          {userData.user? (
            <>
              <input type='submit' class='btn btn-primary' value='Add fruit' />
            </>
          ) : (
            <p>Cannot perform operation unless authenticated!!!</p>
          )}
        </form>
      </div>
    );
}

export default AddFruit
