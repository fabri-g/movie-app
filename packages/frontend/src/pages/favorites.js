import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import MoviesGrid from '../components/moviesGrid';
import TvGrid from '../components/tvGrid';
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

const GET_TV_DETAILS = gql`
  query GetTvDetails($id: ID!) {
    tv(id: $id) {
      id
      name
      firstAirDate
      posterPath
      voteAverage
    }
  }
`;

const FavouritesPage = () => {
  const { favorites } = useFavorites();
  const [favoriteItems, setFavoriteItems] = useState({ movies: [], tvShows: [] });

  useEffect(() => {
    const fetchFavorites = async () => {
      const items = await Promise.all(
        favorites.map(async (fav) => {
          try {
            const query = fav.type === 'movie' ? GET_MOVIE_DETAILS : GET_TV_DETAILS;
            const { data } = await apolloClient.query({
              query,
              variables: { id: fav.id },
            });
            return { ...data[fav.type === 'movie' ? 'movie' : 'tv'], type: fav.type };
          } catch (error) {
            console.error("Error fetching details", error);
            return null;
          }
        })
      );

      // Filter out any null responses
      const movies = items.filter(item => item && item.type === 'movie');
      const tvShows = items.filter(item => item && item.type === 'tv');

      setFavoriteItems({ movies, tvShows });
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        <h2>Movies</h2>
        {favoriteItems.movies.length > 0 && <MoviesGrid movies={favoriteItems.movies} />}
      </div>
      <div>
        <h2>TV Shows</h2>
        {favoriteItems.tvShows.length > 0 && <TvGrid tv={favoriteItems.tvShows} />}
      </div>
    </div>
  );
};

export default FavouritesPage;
