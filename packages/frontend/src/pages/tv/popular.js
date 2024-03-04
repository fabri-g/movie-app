// frontend/pages/tv/popular.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import TvGrid from '../../components/tvGrid';

const GET_POPULAR_TV = gql`
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

function PopularPage() {
  const { data, loading, error } = useQuery(GET_POPULAR_TV, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <TvGrid tv={data?.popularTv || []} />
    </div>
  );
}

export default PopularPage;
