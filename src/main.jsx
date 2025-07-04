import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes'; // linea actualizada para prueba.
import './index.css'; // esta es la línea que activa Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter /> // linea actualziada para prueba
  </React.StrictMode>
);