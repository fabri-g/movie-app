import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { Input, Card } from 'antd/lib';
import debounce from 'lodash.debounce';
import apolloClient from '../lib/apolloClient';
import MoviesGrid from '../components/moviesGrid';
import TvGrid from '../components/tvGrid';

const { Meta } = Card;

const SEARCH_MOVIES = gql`
  query SearchMovies($title: String!) {
    searchMovies(title: $title) {
      id
      title
      releaseDate
      posterPath
      voteAverage
    }
  }
`;

const SEARCH_TV = gql`
  query SearchTV($name: String!) {
    searchTv(name: $name) {
      id
      name
      firstAirDate
      posterPath
      voteAverage
    }
  }
`;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

   // Debounced search function
   const debouncedSearch = debounce(async (query) => {
    if (query) {
      // Search Movies
      const moviesResponse = await apolloClient.query({
        query: SEARCH_MOVIES,
        variables: { title: query },
      });
      setMovies(moviesResponse.data.searchMovies);

      // Search TV Shows
      const tvResponse = await apolloClient.query({
        query: SEARCH_TV,
        variables: { name: query },
      });
      setTvShows(tvResponse.data.searchTv);
    } else {
      setMovies([]);
      setTvShows([]);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
    // Cleanup function to cancel debounced search on component unmount
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  return (
    <div>
      <Input
        placeholder="Search for Movies or TV Shows..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <div>
        <h2>Movies</h2>
        <MoviesGrid movies={movies} />
      </div>
      <div>
        <h2>TV Shows</h2>
        <TvGrid tv={tvShows} />
      </div>
    </div>
  );
};

export default SearchPage;
