// frontend/pages/tv/popular.js
import React from 'react';
import { useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import TvGrid from '../../components/tvGrid';
import { GET_POPULAR_TV } from '../../graphql/queries/popularTvQuery';

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
