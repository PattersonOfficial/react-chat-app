import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';

import Header from './components/Header';
import Welcome from './components/Welcome';
import FruitList from './components/FruitList';
import AddFruit from './components/AddFruit';
import EditFruit from './components/EditFruit';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import axios from 'axios';

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    // checking is user is already logged in

    const isLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenResponse = await axios.post('/api/users/tokenIsValid', null, {
        headers: { 'auth-token': token },
      });

      // console.log(tokenResponse.data)

      if (tokenResponse.data) {
        const userResponse = await axios.get('/api/users/profile', {
          headers: { 'auth-token': token },
        });

        // setting user data including the token and making it available to all child components
        setUserData({
          token: token,
          user: userResponse.data,
        });
      }
    };

    isLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <br />
        <Container>
          <Route path='/' exact component={Welcome} />
          <Route path='/fruitlist' component={FruitList} />
          <Route path='/addfruit' component={AddFruit} />
          <Route path='/fruit/:id' component={EditFruit} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
        </Container>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
