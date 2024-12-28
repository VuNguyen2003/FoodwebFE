// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import từ 'react-dom/client'
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Sử dụng createRoot

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
