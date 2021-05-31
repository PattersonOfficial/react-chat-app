import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'

const domain = 'dev-766o0f8p.us.auth0.com'
const clientID = '4blNNklrQJhos5DPxRA7o01GH0hWX06g';

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientID} redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);


