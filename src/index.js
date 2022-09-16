import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Routers from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routers>
      <App />

    </Routers>
  </React.StrictMode>
);