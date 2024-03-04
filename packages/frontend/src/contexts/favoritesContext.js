import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  const toggleFavorite = (item) => {
    let currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = currentFavorites.findIndex(fav => fav.id === item.id && fav.type === item.type);
    if (index > -1) {
      currentFavorites.splice(index, 1); // Remove if already a favorite
    } else {
      currentFavorites.push(item);
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
