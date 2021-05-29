import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [fruits, setFruits] = useState([]);

 const userDelete = () => {
   axios
     .delete('/api/users/profile', {
       headers: {
         'auth-token': userData.token,
       },
     })
     .then((window.location = '/fruitlist'));

   setUserData({
     token: undefined,
     user: undefined,
   });
   localStorage.setItem('auth-token', '');
 };

  // using use effect to get run fetching data once
  useEffect(() => {
    // Using json placeholder to get fake user json data
    axios.get('/api/fruits').then((response) => setFruits(response.data));
  }, []);

  return (
    <div class='col-md-8'>
      <h1>Profile Information</h1>

      <div class='form-group'>
        <fieldset disabled=''>
          <label class='form-label' for='disabledInput'>
            Name
          </label>
          <input
            class='form-control'
            id='readOnlyInput'
            type='text'
            placeholder={userData.user.name}
            readonly=''
          />
        </fieldset>
      </div>

      <div class='form-group'>
        <fieldset>
          <label class='form-label mt-4' for='readOnlyInput'>
            Email
          </label>
          <input
            class='form-control'
            id='readOnlyInput'
            type='text'
            placeholder={userData.user.email}
            readonly=''
          />
        </fieldset>
      </div>

      <div class='form-group'>
        <fieldset>
          <label class='form-label mt-4' for='readOnlyInput'>
            User ID
          </label>
          <input
            class='form-control'
            id='readOnlyInput'
            type='text'
            placeholder={userData.user.id}
            readonly=''
          />
        </fieldset>
      </div>

      <div class='form-group'>
        <fieldset>
          <label class='form-label mt-4' for='readOnlyInput'>
            Date Registered
          </label>
          <input
            class='form-control'
            id='readOnlyInput'
            type='text'
            placeholder={
              userData.user.date.toString().slice(0, 10) +
              '@' +
              userData.user.date.toString().slice(11, 19)
            }
            readonly=''
          />
        </fieldset>
      </div>

      <br/>

      <h5>
        <b>Fruits Added:</b>
      </h5>

      <div class='form-group'>
        <ul style={{ listStyle: 'none' }}>
          {fruits
            .filter((fruit) => {
              if (fruit.addedBy === userData.user.name) {
                return fruit;
              }
            })
            .map((fruit) => {
              return (
                <li key={fruit._id}>
                  <Link to={`/fruit/${fruit._id}`}>{fruit.name}</Link> (
                  {fruit.amount}) - {fruit.info} [Added on
                  {fruit.date.toString().slice(0, 10) +
                    '@' +
                    fruit.date.toString().slice(11, 19)}
                  ]
                </li>
              );
            })}
        </ul>
      </div>

      <div class='form-group'>
        <fieldset>
          <Button className='btn btn-primary' onClick={userDelete}>
            Delete Account
          </Button>
        </fieldset>
      </div>
    </div>
  );
};

export default Profile;
