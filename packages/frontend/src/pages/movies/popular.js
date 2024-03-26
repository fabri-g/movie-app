// frontend/pages/movies/popular.js
import React from 'react';
import { useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import MoviesGrid from '../../components/moviesGrid';
import { GET_POPULAR_MOVIES } from '../../graphql/queries/popularMoviesQuery';

function PopularPage() {
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

export default PopularPage;
