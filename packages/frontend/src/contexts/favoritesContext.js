// contexts/favoritesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect} = useAuth0();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [isAuthenticated, getAccessTokenSilently]);

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/favorites`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setFavorites(response.data.favorites || []);
      setLoading(false);
    } catch (e) {
      console.error('Error fetching favorites:', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);


  const toggleFavorite =  async (item) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/favorites`, item, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchFavorites(); // Refresh favorites list
    } catch (e) {
      console.error('Error updating favorites:', e);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
