import React, { createContext, useContext, useState } from "react";

// 1. Creamos el contexto
const AlbumContext = createContext();

// 2. Hook para acceder más fácil
export const useAlbum = () => useContext(AlbumContext);

// 3. Provider que envuelve toda la app
export const AlbumProvider = ({ children }) => {
  const [photos, setPhotos] = useState([
  ]);

  // Agregar nueva foto
  const addPhoto = (photo) => {
    setPhotos((prev) => [...prev, photo]);
  };

  return (
    <AlbumContext.Provider value={{ photos, addPhoto }}>
      {children}
    </AlbumContext.Provider>
  );
};
