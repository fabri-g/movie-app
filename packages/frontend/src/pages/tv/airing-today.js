// frontend/pages/tv/airing-today.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import TvGrid from '../../components/tvGrid';

const GET_AIRING_TODAY_TV = gql`
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

function AiringTodayPage() {
  const { data, loading, error } = useQuery(GET_AIRING_TODAY_TV, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>TV Shows Airing Today</h1>
      <TvGrid tv={data?.airingTodayTv || []} />
    </div>
  );
}

export default AiringTodayPage;
