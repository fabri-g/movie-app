import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import MoviesGrid from '../components/moviesGrid';
import { useFavorites } from '../contexts/favoritesContext'; // Import the hook

const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($id: ID!) {
    movie(id: $id) {
      id
      title
      releaseDate
      posterPath
      voteAverage
    }
  }
`;

const FavouritesPage = () => {
  const { favorites } = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const movies = await Promise.all(
        favorites.map(async (id) => {
          try {
            const { data } = await apolloClient.query({
              query: GET_MOVIE_DETAILS,
              variables: { id },
            });
            return data.movie;
          } catch (error) {
            console.error("Error fetching movie details", error);
            return null;
          }
        })
      );

      // Filter out any null responses
      setFavoriteMovies(movies.filter(movie => movie !== null));
    };

    if (favorites.length) {
      fetchFavoriteMovies();
    }
  }, [favorites]); 

  return (
    <div>
      <h1>Favorites</h1>
      <MoviesGrid movies={favoriteMovies} />
    </div>
  );
};

export default FavouritesPage;
