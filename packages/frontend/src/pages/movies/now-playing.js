// frontend/pages/movies/now-playing.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import MoviesGrid from '../../components/moviesGrid';

const GET_NOWPLAYING_MOVIES = gql`
  query GetNowPlayingMovies {
    nowPlayingMovies {
      id
      title
      releaseDate
      posterPath
      voteAverage
    }
  }
`;

function NowPlayingPage() {
  const { data, loading, error } = useQuery(GET_NOWPLAYING_MOVIES, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Now Playing Movies</h1>
      <MoviesGrid movies={data?.nowPlayingMovies || []} />
    </div>
  );
}

export default NowPlayingPage;