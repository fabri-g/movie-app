// frontend/pages/index.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import MoviesGrid from '../components/moviesGrid';

const GET_POPULAR_MOVIES = gql`
  query GetPopularMovies {
    popularMovies {
      id
      title
      releaseDate
      posterPath
      voteAverage
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(GET_POPULAR_MOVIES, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <MoviesGrid movies={data?.popularMovies || []} />
    </div>
  );
}

export default Home;
