// frontend/pages/tv/on-the-air.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import TvGrid from '../../components/tvGrid';

const GET_ON_THE_AIR_TV = gql`
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

function OnTheAirPage() {
  const { data, loading, error } = useQuery(GET_ON_THE_AIR_TV, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>TV Shows On The Air</h1>
      <TvGrid tv={data?.onTheAirTv || []} />
    </div>
  );
}

export default OnTheAirPage;
