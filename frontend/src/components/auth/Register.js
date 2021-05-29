import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import ErrorMsg from '../ErrorMsg';

const Register = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [ errorMsg, setErrorMsg] = useState()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    if (user.password !== user.passwordAgain) {
      setErrorMsg('Passwords do not match');
    } else {

      await axios.post('/api/users/register', newUser);
      
      const loginResponse = await axios.post('/api/users/login', newUser);

      localStorage.setItem('auth-token', loginResponse.data.token);

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      setUser({
        name: '',
        email: '',
        password: '',
        passwordAgain: '',
      });

      window.location = '/fruitlist';
    }
      
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
      <h1>Registration Form</h1>

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
        <label>Email: </label>
        &nbsp;
        <input
          type='email'
          name='email'
          class='form-control'
          onChange={handleChange}
          value={user.email}
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
        <label>Confirm Password: </label>
        &nbsp;
        <input
          type='password'
          name='passwordAgain'
          class='form-control'
          onChange={handleChange}
          value={user.passwordAgain}
          required
        />
        <br />
        <br />
        <input type='submit' class='btn btn-primary' value='I am Ready!' />
      </form>
    </div>
  );
};

export default Register;
