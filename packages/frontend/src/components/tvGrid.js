import React from 'react';
import { Row, Col, Card   } from 'antd/lib';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import Link from 'next/link';
import { useFavorites } from '../contexts/favoritesContext';

const { Meta } = Card;

const TvGrid = ({ tv }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = (id, type) => favorites.some(fav => fav.id === id && fav.type === type);

  const handleFavoriteClick = (e, id) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
    toggleFavorite({ id, type: 'tv' });
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: '0 50px' }}>
      {tv.map(({ id, name, firstAirDate, posterPath, voteAverage }) => (
        <Col key={id} span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/tv/${id}`} passHref>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={name} src={`https://image.tmdb.org/t/p/w500${posterPath}`} />}
                actions={[
                  isFavorite(id, 'tv') ? (
                    <HeartFilled key="filled" onClick={(e) => handleFavoriteClick(e, id)} />
                  ) : (
                    <HeartOutlined key="outline" onClick={(e) => handleFavoriteClick(e, id)} />
                  ),
                ]}
              >
                <Meta title={name} description={`First Air Date: ${firstAirDate}`} />
                <p>Rating: {voteAverage}</p>
              </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default TvGrid;
