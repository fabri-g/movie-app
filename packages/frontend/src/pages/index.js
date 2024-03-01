// frontend/pages/index.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import { Row, Col, Card } from 'antd/lib';
import Link from 'next/link';

const { Meta } = Card;

const GET_POPULAR_MOVIES = gql`
  query GetPopularMovies {
    popularMovies {
      id
      title
      releaseDate
      posterPath
      voteAverage
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(GET_POPULAR_MOVIES, { client: apolloClient });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <Row gutter={[16, 16]} style={{ padding: '0 50px' }}>
        {data.popularMovies.map(({ id, title, releaseDate, posterPath, voteAverage }) => (
          <Col key={id} span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href={`/movies/${id}`} passHref>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={title} src={`https://image.tmdb.org/t/p/w500${posterPath}`} />}
                >
                  <Meta title={title} description={`Release Date: ${releaseDate}`} />
                  <p>Rating: {voteAverage}</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
