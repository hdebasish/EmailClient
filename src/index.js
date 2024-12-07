import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import EmailProvider from './context/EmailProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmailProvider>
      <App />
    </EmailProvider>
  </React.StrictMode>
);
