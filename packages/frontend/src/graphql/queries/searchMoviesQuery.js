// src/graphql/queries/searchMoviesQuery.js
import { gql } from '@apollo/client';

export const SEARCH_MOVIES = gql`
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
