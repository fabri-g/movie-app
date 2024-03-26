// src/graphql/queries/tvDetailsQuery.js
import { gql } from '@apollo/client';

export const GET_TV_DETAILS = gql`
  query GetTvDetails($id: ID!) {
    tv(id: $id) {
      id
      name
      firstAirDate
      summary
      posterPath
      voteAverage
      numberOfSeasons
      numberOfEpisodes
      genres {
        name
      }
      createdBy {
        name
      }
      productionCountries {
        name
      }
      cast {
        name
        character
        profilePath
      }
    }
  }
`;
