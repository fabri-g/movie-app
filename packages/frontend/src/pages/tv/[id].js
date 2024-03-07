// pages/tv/[id].js
import {Avatar, List, Card, Row, Col, Space, Typography, Progress} from 'antd/lib';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import {gql} from '@apollo/client';
import apolloClient from '../../lib/apolloClient';
import {useFavorites} from '../../contexts/favoritesContext';
import { useAuth0 } from '@auth0/auth0-react';

const {Text, Title} = Typography;

const GET_TV_DETAILS = gql`
  query GetTvDetails($id: ID!) {
    tv(id: $id) {
      id
      name
      firstAirDate
      summary
      posterPath
      voteAverage
      numberOfSeasons
      numberOfEpisodes
      genres {
        name
      }
      createdBy {
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
  try {
    const { id } = context.params;
    const { data } = await apolloClient.query({
      query: GET_TV_DETAILS,
      variables: { id: String(id) },
    });
    return { props: { tv: data.tv } };
  } catch (error) {
    console.error("Error fetching TV details:", error.networkError?.result || error.message);
    return { props: { error: error.message } };
  }
}

const TvDetails = ({tv}) => {
  const {favorites, toggleFavorite} = useFavorites();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const isFavorite = (id, type) => favorites.some(fav => fav.id === id && fav.type === type);

  const votePercentage = Math.round(tv.voteAverage * 10);

  const handleFavoriteClick = (e, id) => {
    e.stopPropagation(); // Prevent link navigation
    if (isAuthenticated) {
      toggleFavorite({ id, type: 'tv' });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <>
      <Card hoverable>
        <Row gutter = {[16, 16]}>
          <Col span = {8}>
            <img
              alt = {tv.name}
              src = {`https://image.tmdb.org/t/p/w500${tv.posterPath}`}
              style={{ width: '81%', height: 'auto', display: 'block' }}
            />
          </Col>
          <Col span={16}>
            <Space direction="vertical" size="middle">
              <Title level={2} style={{ marginBottom: -12, marginTop: 0 }}>{tv.name}</Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: -16 }}>
                {tv.firstAirDate} · {tv.genres.map((genre) => genre.name).join(', ')}
              </Text>
              <Title level={4} style={{ marginBottom: -8 }} >Summary</Title>
                <Text style={{ display: 'block', marginBottom: 16 }} >{tv.summary}</Text>
                <Space align="center" style={{ marginBottom: 16 }}>
                  <Title level={4} style={{ marginRight: 8, marginTop: 8 }}>Rating</Title>
                  <Progress type="circle" percent={votePercentage} size={65} />
                </Space>
                <Text><strong>Seasons:</strong> {tv.numberOfSeasons}</Text>
                <Text><strong>Total Episodes:</strong> {tv.numberOfEpisodes}</Text>
                <Text><strong>Created By:</strong> {tv.createdBy.map(pc => pc.name).join(', ')}</Text>
                <Text><strong>Production Countries:</strong> {tv.productionCountries.map(country => country.name).join(', ')}</Text>
              </Space>
            </Col>
          </Row>
          <Row justify="start" style={{ marginTop: '20px' }}>
            <Space>
              {isFavorite(tv.id, 'tv') ? (
                <HeartFilled onClick={(e) => handleFavoriteClick(e, tv.id)} style={{ color: 'red', cursor: 'pointer' }} />
              ) : (
                <HeartOutlined onClick={(e) => handleFavoriteClick(e, tv.id)} style={{ cursor: 'pointer' }} />
              )}
              <Text type="secondary">Add to favorites</Text>
            </Space>
          </Row>
        </Card>
        <div style={{ marginTop: '20px' }}>
            <h2>Cast</h2>
            <List
                itemLayout="horizontal"
                dataSource={tv.cast}
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

export default TvDetails;
