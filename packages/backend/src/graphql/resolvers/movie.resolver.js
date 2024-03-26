// /src/resolvers/movie.js
const tmdbService = require('../../services/tmdb.service');
const { transformSingleMovie, transformMovies, transformCreditsData } = require('../../utils/transformers');

const movieResolvers = {
  Query: {
    movie: async (_, { id }) => {
      try {
        const movieResponse = await tmdbService.fetchMovieById(id);
        const creditsResponse = await tmdbService.fetchMovieCreditsById(id);

        // Transform to match GraphQL schema
        let movie = transformSingleMovie(movieResponse.data);
        let creditsData = transformCreditsData(creditsResponse.data);

        movie = { ...movie, ...creditsData };

        return movie;
      } catch (error) {
        console.error(`Failed to fetch movie with id ${id}:`, error);
        throw new Error(`Failed to fetch movie with id ${id}.`);
      }
    },

    searchMovies: async (_, { title }) => {
      try {
        const response = await tmdbService.searchMovies(title);

        // Transform to match GraphQL schema
        return transformMovies(response.data.results);
      } catch (error) {
        console.error("Failed to search movies:", error);
        throw new Error("Failed to search movies.");
      }
    },

    popularMovies: async () => {
      try {
        const response = await tmdbService.fetchPopularMovies();
        // Transform to match GraphQL schema
        return transformMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        throw new Error("Failed to fetch popular movies.");
      }
    },

    nowPlayingMovies: async () => {
      try {
        const response = await tmdbService.fetchNowPlayingMovies();
        // Transform to match GraphQL schema
        return transformMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
        throw new Error("Failed to fetch now playing movies.");
      }
    },

    topRatedMovies: async () => {
      try {
        const response = await tmdbService.fetchTopRatedMovies();
        // Transform to match GraphQL schema
        return transformMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch top rated movies:", error);
        throw new Error("Failed to fetch top rated movies.");
      }
    },
  },
};
module.exports = movieResolvers;
