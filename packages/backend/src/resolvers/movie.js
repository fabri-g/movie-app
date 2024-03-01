// /src/resolvers/movie.js
const axios = require('axios');
require('dotenv').config();

const TMDb_API_KEY = process.env.TMDb_API_KEY;
const TMDb_BASE_URL = process.env.TMDb_BASE_URL;

const movieResolvers = {
  Query: {
    movie: async (_, { id }) => {
      try {
        const movieResponse = await axios.get(`${TMDb_BASE_URL}/movie/${id}`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });
        const creditsResponse = await axios.get(`${TMDb_BASE_URL}/movie/${id}/credits`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });

        const movie = movieResponse.data;
        const creditsData = creditsResponse.data;
        
         // Transform to match GraphQL schema
         return {
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          summary: movie.overview,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          genreIds: movie.genre_ids,
          popularity: movie.popularity,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          cast: creditsData.cast.map(castMember => ({
            id: castMember.id,
            name: castMember.name,
            character: castMember.character,
            profilePath: castMember.profile_path,
          })),
        };
      } catch (error) {
        console.error(`Failed to fetch movie with id ${id}:`, error);
        throw new Error(`Failed to fetch movie with id ${id}.`);
      }
    },

    searchMovies: async (_, { title }) => {
      
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/search/movie`, {
          params: {
            api_key: TMDb_API_KEY,
            query: title,
            include_adult: false,
            language: 'en-US',
            page: 1
          }
        });

        // Transform to match GraphQL schema
        return response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          summary: movie.overview,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          genreIds: movie.genre_ids,
          popularity: movie.popularity,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        }));
      } catch (error) {
        console.error("Failed to search movies:", error);
        throw new Error("Failed to search movies.");
      }
    },
    
    popularMovies: async () => {
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/movie/popular`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
            page: 1
          }
        });
        // Transform to match GraphQL schema
        return response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          summary: movie.overview,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          genreIds: movie.genre_ids,
          popularity: movie.popularity,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        }));
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        throw new Error("Failed to fetch popular movies.");
      }
    },
  },
};
module.exports = movieResolvers;
