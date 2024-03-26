//src/resolvers/tv.js
const tmdbService = require('../../services/tmdb.service');
const { transformSingleTV, transformTvShows, transformCreditsData } = require('../../utils/transformers');

const tvResolvers = {
  Query: {
    tv: async (_, { id }) => {
      try {
        const tvResponse = await tmdbService.fetchTvById(id);
        const creditsResponse = await tmdbService.fetchTvCreditsById(id);

        let tv = transformSingleTV(tvResponse.data);
        let creditsData = transformCreditsData(creditsResponse.data);

        tv = { ...tv, ...creditsData };

        return tv;
      } catch (error) {
        console.error(`Failed to fetch tv show with id ${id}:`, error.response?.data || error);
        throw new Error(`Failed to fetch tv show with id ${id}.`);
      }
    },

    searchTv: async (_, { name }) => {
      try {

        const response = await tmdbService.searchTvShows(name);

        return transformTvShows(response.data.results);
      } catch (error) {
        console.error(`Failed to search tv shows with title ${title}:`, error.response?.data || error);
        throw new Error(`Failed to search tv shows with title ${title}.`);
      }
    },

    popularTv: async () => {
      try {
        const response = await tmdbService.fetchPopularTvShows();
        return transformTvShows(response.data.results);
      } catch (error) {
        console.error("Failed to fetch popular tv shows:", error.response?.data || error);
        throw new Error("Failed to fetch popular tv shows.");
      }
    },

    airingTodayTv: async () => {
      try {
        const response = await tmdbService.fetchAiringTodayTvShows();
        return transformTvShows(response.data.results);
      } catch (error) {
        console.error("Failed to fetch tv shows airing today:", error.response?.data || error);
        throw new Error("Failed to fetch tv shows airing today.");
      }
    },

    topRatedTv: async () => {
      try {
        const response = await tmdbService.fetchTopRatedTvShows();
        return transformTvShows(response.data.results);
      } catch (error) {
        console.error("Failed to fetch top rated tv shows:", error.response?.data || error);
        throw new Error("Failed to fetch top rated tv shows.");
      }
    },

    onTheAirTv: async () => {
      try {
        const response = await tmdbService.fetchOnTheAirTvShows();
        return transformTvShows(response.data.results);
      } catch (error) {
        console.error("Failed to fetch tv shows on the air:", error.response?.data || error);
        throw new Error("Failed to fetch tv shows on the air.");
      }
    },

  }
};

module.exports = tvResolvers;
