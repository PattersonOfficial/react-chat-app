import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {

  const { userData, setUserData } = useContext(UserContext);

  // logout functionality
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem('auth-token', '');
  };

  return (
    <div>
      <Navbar
        bg='navbar-dark bg-primary'
        expand='lg'
        class='navbar navbar-expand-lg navbar-dark bg-primary'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand style={{ color: 'white' }}>Chat App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Nav className='ml-auto'>
              <LinkContainer to='/fruitlist'>
                <Nav.Link>Fruit List</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/addfruit'>
                <Nav.Link>Add New Fruit</Nav.Link>
              </LinkContainer>
            </Nav> */}

            {userData.user ? (
              <Nav className='ml-auto'>
                <LinkContainer to='/chat'>
                  <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/profile'>
                  <Nav.Link>Profile ({userData.user.name})</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              <Nav className='ml-auto'>
                <LinkContainer to='/register'>
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
