import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {  Button  } from 'react-bootstrap'

const EditFruit = ({ match }) => {
  const [fruit, setFruit] = useState({
    name: '',
    amount: 0,
    info: '',
  });

  useEffect(() => {
    axios
      .get('/api/fruits/' + match.params.id)
      .then((response) => setFruit(response.data));
  }, []);

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFruit((oldfruit) => {
       return {
         ...oldfruit,
         [name]: value,
       };
     });
   };

   // update fruit information
   const fruitUpdate = () => {
     axios.put('/api/fruits/' + match.params.id, fruit)
     .then((fruit) => console.log(fruit))

     window.location = '/fruitlist'
   }

   const fruitDelete = () => {
       axios.delete('/api/fruits/' + match.params.id)
       .then((res) => console.log(res.status))

       window.location = '/fruitlist'
   }

  return (
    <div>
      <h1>Editing {fruit.name}</h1>

      <form>
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

        <Button className='btn btn-warning' onClick={fruitUpdate}>Update fruit</Button> 
        &nbsp; &nbsp;
        <Button className='btn btn-danger' onClick={fruitDelete}>Delete fruit</Button>
      </form>

    </div>
  );
};

export default EditFruit
