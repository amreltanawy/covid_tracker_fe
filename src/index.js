import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiProvider } from '@elastic/eui';

ReactDOM.render(
  <React.StrictMode>
      <Auth0Provider
          domain="dev-f9262uav.us.auth0.com"
          clientId="DGHtFVGclDRhNXnmelCjlQYKXYPQugE8"
          redirectUri={window.location.origin}
      >
          <EuiProvider colorMode="light">
            <App />
          </EuiProvider>
      </Auth0Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
