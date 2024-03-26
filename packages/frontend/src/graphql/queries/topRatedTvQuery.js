// src/graphql/queries/topRatedTvQuery.js
import { gql } from '@apollo/client';

export const GET_TOP_RATED_TV = gql`
  query GetTopRatedTv {
    topRatedTv {
      id
      name
      firstAirDate
      posterPath
      voteAverage
    }
  }
`;
