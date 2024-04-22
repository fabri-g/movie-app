// src/graphql/queries/topRatedMoviesQuery.js
import { gql } from '@apollo/client';

export const GET_TOPRATED_MOVIES = gql`
    query GetTopRatedMovies {
        topRatedMovies {
            id
            title
            releaseDate
            posterPath
            voteAverage
        }
    }
`;
