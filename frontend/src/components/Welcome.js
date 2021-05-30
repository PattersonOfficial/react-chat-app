import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Welcome = () => {

  const register = () => {
    window.location = '/register'
  }

  const login = () => {
    window.location = '/login'
  }

  return (
    <div>
      <Container>
        <Container>
          <Container>
            <Container>
              <div>
                <h1>Welcome</h1>
                <br />
                <h6>
                  <Button className='btn btn-success' onClick={register}>
                    Register
                  </Button>
                  &nbsp; &nbsp;
                  <Button className='btn btn-secondary' onClick={login}>
                    Login
                  </Button>
                </h6>
                <br />
              </div>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default Welcome;
