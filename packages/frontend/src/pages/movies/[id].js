// pages/movie/[id].js
import { Avatar, List, Card, Row, Col, Space, Typography, Progress } from 'antd/lib';
import  UserOutlined  from '@ant-design/icons/UserOutlined';
import HeartOutlined  from '@ant-design/icons/HeartOutlined';
import HeartFilled  from '@ant-design/icons/HeartFilled';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import { useFavorites } from '../../contexts/favoritesContext';

const { Text, Title } = Typography;

const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($id: ID!) {
    movie(id: $id) {
      id
      title
      releaseDate
      summary
      posterPath
      voteAverage
      budget
      revenue
      runtime
      genres {
        name
      }
      productionCompanies {
        name
      }
      productionCountries {
        name
      }
      cast {
        name
        character
        profilePath
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await apolloClient.query({
    query: GET_MOVIE_DETAILS,
    variables: { id },
  });

  return {
    props: { movie: data.movie },
  };
}

const MovieDetails = ({ movie }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = (id, type) => favorites.some(fav => fav.id === id && fav.type === type);

  const formatCurrency = (amount) => `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -3)}`;
  const formatRuntime = (runtime) => `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const votePercentage = Math.round(movie.voteAverage * 10);

  const handleFavoriteClick = (e, id) => {
    e.stopPropagation(); // Prevent link navigation
    toggleFavorite({ id, type: 'movie' });
  };

    return (
      <>
        <Card hoverable>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <img
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                style={{ width: '81%', height: 'auto', display: 'block' }}
              />
            </Col>
            <Col span={16}>
              <Space direction="vertical" size="middle">
                <Title level={2} style={{ marginBottom: -12, marginTop: 0 }}>{movie.title}</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: -16 }}>
                  {movie.releaseDate} · {movie.genres.map(genre => genre.name).join(', ')} · {formatRuntime(movie.runtime)}
                </Text>
                <Title level={4} style={{ marginBottom: -8 }} >Summary</Title>
                <Text style={{ display: 'block', marginBottom: 16 }} >{movie.summary}</Text>
                <Space align="center" style={{ marginBottom: 16 }}>
                  <Title level={4} style={{ marginRight: 8, marginTop: 8 }}>Rating</Title>
                  <Progress type="circle" percent={votePercentage} size={65} />
                </Space>
                <Text><strong>Budget:</strong> {formatCurrency(movie.budget)}</Text>
                <Text><strong>Revenue:</strong> {formatCurrency(movie.revenue)}</Text>
                <Text><strong>Production Companies:</strong> {movie.productionCompanies.map(pc => pc.name).join(', ')}</Text>
                <Text><strong>Production Countries:</strong> {movie.productionCountries.map(country => country.name).join(', ')}</Text>
              </Space>
            </Col>
          </Row>
          <Row justify="start" style={{ marginTop: '20px' }}>
            <Space>
              {isFavorite(movie.id, 'movie') ? (
                <HeartFilled onClick={(e) => handleFavoriteClick(e, movie.id)} style={{ color: 'red', cursor: 'pointer' }} />
              ) : (
                <HeartOutlined onClick={(e) => handleFavoriteClick(e, movie.id)} style={{ cursor: 'pointer' }} />
              )}
              <Text type="secondary">Add to favorites</Text>
            </Space>
          </Row>
        </Card>
        <div style={{ marginTop: '20px' }}>
            <h2>Cast</h2>
            <List
                itemLayout="horizontal"
                dataSource={movie.cast}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 4,
                }}
                renderItem={actor => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                actor.profilePath ? (
                                    <Avatar src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/200"; }} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} />
                                )
                            }
                            title={actor.name}
                            description={` ${actor.character}`}
                        />
                    </List.Item>
                )}
            />
        </div>
      </>
    );
};

export default MovieDetails;
