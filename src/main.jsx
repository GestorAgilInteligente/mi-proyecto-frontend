import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes'; // carga las rutas directamente
import './index.css'; // activa los estilos de Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
