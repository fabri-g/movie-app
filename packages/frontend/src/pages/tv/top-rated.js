// frontend/pages/tv/top-rated.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import TvGrid from '../../components/tvGrid';
import { GET_TOP_RATED_TV } from '../../graphql/queries/topRatedTvQuery';

function TopRatedPage() {
  const { data, loading, error } = useQuery(GET_TOP_RATED_TV, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Top Rated TV Shows</h1>
      <TvGrid tv={data?.topRatedTv || []} />
    </div>
  );
}

export default TopRatedPage;
