import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import ErrorMsg from '../ErrorMsg';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Login = () => {

  const { userData, setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
  
    e.preventDefault();

    try {
      const newUser = {
        name: user.name,
        password: user.password,
      };

      const loginResponse = await axios.post('/api/users/login', newUser);
      
      console.log(loginResponse.data)
      
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      localStorage.setItem('auth-token', loginResponse.data.token);

      setUser({
        name: '',
        password: '',
      });

      window.location = '/fruitlist';
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg('Something went horribly wrong!');
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
