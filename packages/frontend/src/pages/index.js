// frontend/pages/index.js
import React from 'react';
import { useQuery } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import MoviesGrid from '../components/moviesGrid';
import TvGrid from '../components/tvGrid';
import { GET_POPULAR_MOVIES } from '../graphql/queries/popularMoviesQuery';
import { GET_NOWPLAYING_MOVIES } from '../graphql/queries/nowPlayingMoviesQuery';
import { GET_POPULAR_TV } from '../graphql/queries/popularTvQuery';
import { GET_ON_THE_AIR_TV } from '../graphql/queries/onTheAirTvQuery';

function Home() {
  const { data: popularMoviesData, loading: loadingPopularMovies, error: errorPopularMovies } = useQuery(GET_POPULAR_MOVIES, { client: apolloClient });
  const { data: nowPlayingMoviesData, loading: loadingNowPlayingMovies, error: errorNowPlayingMovies } = useQuery(GET_NOWPLAYING_MOVIES, { client: apolloClient });
  const { data: popularTvData, loading: loadingPopularTv, error: errorPopularTv } = useQuery(GET_POPULAR_TV, { client: apolloClient });
  const { data: onTheAirTvData, loading: loadingOnTheAirTv, error: errorOnTheAirTv } = useQuery(GET_ON_THE_AIR_TV, { client: apolloClient });

  if (loadingPopularMovies || loadingNowPlayingMovies || loadingPopularTv || loadingOnTheAirTv) return <p>Loading...</p>;
  if (errorPopularMovies || errorNowPlayingMovies || errorPopularTv || errorOnTheAirTv) return <p>Error :(</p>;

  const popularMovies = popularMoviesData?.popularMovies.slice(0, 4) || [];
  const nowPlayingMovies = nowPlayingMoviesData?.nowPlayingMovies.slice(0, 4) || [];
  const popularTv = popularTvData?.popularTv.slice(0, 4) || [];
  const onTheAirTv = onTheAirTvData?.onTheAirTv.slice(0, 4) || [];

  return (
    <div>
      <h1>Popular Movies</h1>
      <MoviesGrid movies={popularMovies} />
      <h1>Now Playing Movies</h1>
      <MoviesGrid movies={nowPlayingMovies} />
      <h1>Popular TV Shows</h1>
      <TvGrid tv={popularTv} />
      <h1>TV Shows On The Air</h1>
      <TvGrid tv={onTheAirTv} />
    </div>
  );
}

export default Home;
