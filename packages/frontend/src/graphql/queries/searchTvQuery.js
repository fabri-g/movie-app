// src/graphql/queries/searchTvQuery.js
import { gql } from '@apollo/client';

export const SEARCH_TV = gql`
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
