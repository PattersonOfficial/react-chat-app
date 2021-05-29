import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { UserContext } from '../App';

const EditFruit = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

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
    axios
      .put('/api/fruits/' + match.params.id, fruit)
      .then((fruit) => console.log(fruit));

    window.location = '/fruitlist';
  };

  const fruitDelete = () => {
    axios
      .delete('/api/fruits/' + match.params.id)
      .then((res) => console.log(res.status));

    window.location = '/fruitlist';
  };

  return (
    <div class='col-md-8'>
      <h1>Editing {fruit.name}</h1>

      <form>
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
        {userData.user ? (
          <>
            <Button className='btn btn-warning' onClick={fruitUpdate}>
              Update fruit
            </Button>
            &nbsp; &nbsp;
            <Button className='btn btn-dark' onClick={fruitDelete}>
              Delete fruit
            </Button>
          </>
        ) : (
          <p>Cannot perform operation unless authenticated!!!</p>
        )}
      </form>
    </div>
  );
};

export default EditFruit;
