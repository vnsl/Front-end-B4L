import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
