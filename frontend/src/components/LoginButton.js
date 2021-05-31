import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Button } from 'react-bootstrap';

const LoginButton = () => {

    const { loginWithRedirect } = useAuth0();

    return (
      <div>
        <Button
          className='btn btn-success btn-round'
          onClick={() => loginWithRedirect()}
        >
          Login / Register
        </Button>
      </div>
    );
}

export default LoginButton
