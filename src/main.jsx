import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';

// 👇 Importamos el Provider del contexto
import { AlbumProvider } from '@/context/AlbumContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 👇 Envuelve toda la app con el contexto de fotos */}
      <AlbumProvider>
        <App />
      </AlbumProvider>
    </BrowserRouter>
  </React.StrictMode>
);
