import React from 'react';
import { Row, Col, Card   } from 'antd/lib';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import Link from 'next/link';
import { useFavorites } from '../contexts/favoritesContext';
import { useAuth0 } from '@auth0/auth0-react';

const { Meta } = Card;
const noImageSrc = '/no-image.svg'

const TvGrid = ({ tv }) => {
  const { favorites, toggleFavorite, loading } = useFavorites();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const isFavorite = (id, type) => favorites.some(fav => fav.id.toString() === id.toString() && fav.type === type);

  const handleFavoriteClick = (e, id) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
    if (isAuthenticated) {
      toggleFavorite({ id, type: 'tv' });
    } else {
      loginWithRedirect();
    }
  };

  if (loading && isAuthenticated) {
    return <div>Loading favorites...</div>;
  }
  return (
    <Row gutter={[16, 16]} style={{ padding: '0 50px' }}>
      {tv.map(({ id, name, firstAirDate, posterPath, voteAverage }) => (
        <Col key={id} span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/tv/${id}`} passHref>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                posterPath ? (
                  <img alt={name} src={`https://image.tmdb.org/t/p/w500${posterPath}`} />
                ) : (
                  <div style={{ backgroundColor: '#dbdbdb', width: '100%', height: 0, paddingBottom: '150%', position: 'relative' }}>
                    <img src={noImageSrc} alt="No image available" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '50%', maxHeight: '50%' }} />
                  </div>
                )
              }
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
