// src/graphql/queries/movieDetailsQuery.js
import { gql } from '@apollo/client';

export const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($id: ID!) {
    movie(id: $id) {
      id
      title
      releaseDate
      summary
      posterPath
      voteAverage
      budget
      revenue
      runtime
      genres {
        name
      }
      productionCompanies {
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
