// src/graphql/queries/popularTvQuery.js
import { gql } from '@apollo/client';

export const GET_POPULAR_TV = gql`
  query GetPopularTv {
    popularTv {
      id
      name
      firstAirDate
      posterPath
      voteAverage
    }
  }
`;
