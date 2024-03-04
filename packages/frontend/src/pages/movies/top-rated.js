//frontend/pages/movies/top-rated.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import MoviesGrid from '../../components/moviesGrid';

const GET_TOPRATED_MOVIES = gql`
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

function TopRatedPage() {
    const { data, loading, error } = useQuery(GET_TOPRATED_MOVIES, { client: apolloClient });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h1>Top Rated Movies</h1>
            <MoviesGrid movies={data?.topRatedMovies || []} />
        </div>
    );
}

export default TopRatedPage;