// src/graphql/queries/popularMoviesQuery.js
import { gql } from '@apollo/client';

export const GET_POPULAR_MOVIES = gql`
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
