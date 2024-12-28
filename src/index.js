// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import từ 'react-dom/client'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Nếu bạn đang sử dụng Bootstrap

const container = document.getElementById('root');

// Tạo root với ReactDOM.createRoot
const root = ReactDOM.createRoot(container);

// Render ứng dụng
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
