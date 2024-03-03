import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Input, Row, Col, Card } from 'antd/lib';
import debounce from 'lodash.debounce';
import apolloClient from '../lib/apolloClient';
import Link from 'next/link';
import MoviesGrid from '../components/moviesGrid';

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

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  // Debounced search function
  const debouncedSearch = debounce(async (title) => {
    const { data } = await apolloClient.query({
      query: SEARCH_MOVIES,
      variables: { title },
    });
    setMovies(data.searchMovies);
  }, 500); // 500ms debounce time

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <MoviesGrid movies={movies} />
    </div>
  );
};

export default SearchPage;
