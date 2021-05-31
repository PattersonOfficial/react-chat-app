import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import LoginButton from './LoginButton';

const Welcome = () => {

  return (
    <div>
      <Container>
        <Container>
          <Container>
            <Container>
              <div>
                <h1>Welcome Buddie</h1>
                <br />
                <h6>
                  You know the drill. Click on the button above to authenticate
                  yourself and then chat
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
