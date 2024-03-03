import React from 'react';
import { Row, Col, Card   } from 'antd/lib';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import Link from 'next/link';
import { useFavorites } from '../contexts/favoritesContext';

const { Meta } = Card;

const MoviesGrid = ({ movies }) => {
    const { favorites, toggleFavorite } = useFavorites();
    
    const isFavorite = (id) => favorites.includes(id);
  
    const handleFavoriteClick = (e, id) => {
        e.preventDefault(); // Prevent default action
        e.stopPropagation(); // Prevent event from bubbling up to parent elements
        toggleFavorite(id);
    };
    
    return (
      <Row gutter={[16, 16]} style={{ padding: '0 50px' }}>
        {movies.map(({ id, title, releaseDate, posterPath, voteAverage }) => (
          <Col key={id} span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href={`/movies/${id}`} passHref>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={title} src={`https://image.tmdb.org/t/p/w500${posterPath}`} />}
                  actions={[
                    isFavorite(id) ? (
                      <HeartFilled key="filled" onClick={(e) => handleFavoriteClick(e, id)} />
                    ) : (
                      <HeartOutlined key="outline" onClick={(e) => handleFavoriteClick(e, id)} />
                    ),
                  ]}
                >
                  <Meta title={title} description={`Release Date: ${releaseDate}`} />
                  <p>Rating: {voteAverage}</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    );
  };
  
  export default MoviesGrid;
