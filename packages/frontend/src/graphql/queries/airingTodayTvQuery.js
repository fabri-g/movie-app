// src/graphql/queries/airingTodayTvQuery.js
const { gql } = require('@apollo/client');

export const GET_AIRING_TODAY_TV = gql`
  query GetAiringTodayTv {
    airingTodayTv {
      id
      name
      firstAirDate
      posterPath
      voteAverage
    }
  }
`;
