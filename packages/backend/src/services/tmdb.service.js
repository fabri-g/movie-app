// /src/services/tmdb.js
const axiosClient = require('../api/axiosClient');

const tmdbService = {
  fetchMovieById: async (id) => {
    return axiosClient.get(`/movie/${id}`);
  },

  fetchMovieCreditsById: async (id) => {
    return axiosClient.get(`/movie/${id}/credits`);
  },

  searchMovies: async (title) => {
    return axiosClient.get(`/search/movie`, {
      params: { query: title },
    });
  },

  fetchPopularMovies: async () => {
    return axiosClient.get(`/movie/popular`);
  },

  fetchNowPlayingMovies: async () => {
    return axiosClient.get(`/movie/now_playing`);
  },

  fetchTopRatedMovies: async () => {
    return axiosClient.get(`/movie/top_rated`);
  },

  fetchTvById: async (id) => {
    return axiosClient.get(`/tv/${id}`);
  },

  fetchTvCreditsById: async (id) => {
    return axiosClient.get(`/tv/${id}/credits`);
  },

  searchTvShows: async (name) => {
    return axiosClient.get(`/search/tv`, {
      params: { query: name },
    });
  },

  fetchPopularTvShows: async () => {
    return axiosClient.get(`/tv/popular`);
  },

  fetchAiringTodayTvShows: async () => {
    return axiosClient.get(`/tv/airing_today`);
  },

  fetchTopRatedTvShows: async () => {
    return axiosClient.get(`/tv/top_rated`);
  },

  fetchOnTheAirTvShows: async () => {
    return axiosClient.get(`/tv/on_the_air`);
  }

};

module.exports = tmdbService;
