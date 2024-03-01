// pages/movie/[id].js
import { Avatar, List, Card, Row, Col } from 'antd/lib';
import  UserOutlined  from '@ant-design/icons/UserOutlined';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';

// This query should be adjusted or expanded based on your GraphQL API schema
const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($id: ID!) {
    movie(id: $id) {
      title
      releaseDate
      posterPath
      voteAverage
      summary
      genres {
        name
      }
      budget
      revenue
      productionCompanies {
        name
      }
      cast {
        id
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
    props: {
      movie: data.movie,
    },
  };
}

const MovieDetails = ({ movie }) => {
    return (
        <>
            <Card hoverable>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <div style={{ padding: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <img
                                alt={movie.title}
                                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                style={{ maxWidth: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <h2>{movie.title}</h2>
                        <p>Release Date: {movie.releaseDate}</p>
                        <p>Rating: {movie.voteAverage}</p>
                        <p>Genres: {movie.genres?.map(genre => genre.name).join(', ') ?? 'N/A' }</p>
                        <p>Summary: {movie.summary}</p>
                        <p>Budget: ${movie.budget}</p>
                        <p>Revenue: ${movie.revenue}</p>
                        <p>Production Companies: {movie.productionCompanies?.map(pc => pc.name).join(', ') ?? 'N/A'}</p>
                    </Col>
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
