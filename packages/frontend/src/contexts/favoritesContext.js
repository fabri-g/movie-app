import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  const toggleFavorite = (id) => {
    let currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (currentFavorites.includes(id)) {
      currentFavorites = currentFavorites.filter(favId => favId !== id);
    } else {
      currentFavorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
    setFavorites(currentFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
