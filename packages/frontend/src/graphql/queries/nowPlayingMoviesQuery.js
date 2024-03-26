// src/graphql/queries/nowPlayingMoviesQuery.js
import { gql } from '@apollo/client';

export const GET_NOWPLAYING_MOVIES = gql`
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
