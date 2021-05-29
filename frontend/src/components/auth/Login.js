import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import ErrorMsg from '../ErrorMsg';

const Login = () => {

    const { userData, setUserData }  = useContext(UserContext)

     const [errorMsg, setErrorMsg] = useState();

  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const newUser = {
          name: user.name,
          password: user.password,
        };

        const loginResponse = await axios.post('/api/users/login', newUser);

        // console.log(loginResponse.data);

        localStorage.setItem('auth-token', loginResponse.data.token);

        setUserData({
          token: loginResponse.data.token,
          user: loginResponse.data.user,
        });

        setUser({
          name: '',
          password: '',
        });

        window.location = '/fruitlist';
    } catch (err) {
       err.response.data.message
         ? setErrorMsg(err.response.data.message)
         : setErrorMsg('Something went wrong');
    }
  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  };

  return (
    <div class='col-md-8'>
      <h1>Login Form</h1>

      {errorMsg && <ErrorMsg msg={errorMsg} />}

      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        &nbsp;
        <input
          type='text'
          name='name'
          class='form-control'
          value={user.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label>Password: </label>
        &nbsp;
        <input
          type='password'
          name='password'
          class='form-control'
          onChange={handleChange}
          value={user.password}
          required
        />
        <br />
        <br />
        <input type='submit' class='btn btn-success' value='Lemme In!' />
      </form>
    </div>
  );
};

export default Login;
