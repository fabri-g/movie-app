// frontend/pages/tv/airing-today.js
import React from 'react';
import { useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import TvGrid from '../../components/tvGrid';
import { GET_AIRING_TODAY_TV } from '../../graphql/queries/airingTodayTvQuery';

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
