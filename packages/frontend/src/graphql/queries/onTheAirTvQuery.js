// src/graphql/queries/onTheAirTvQuery.js
import { gql } from '@apollo/client';

export const GET_ON_THE_AIR_TV = gql`
  query GetOnTheAirTv {
    onTheAirTv {
      id
      name
      firstAirDate
      posterPath
      voteAverage
    }
  }
`;
