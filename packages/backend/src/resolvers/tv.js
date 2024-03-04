//src/resolvers/tv.js
const axios = require('axios');
require('dotenv').config();

const TMDb_API_KEY = process.env.TMDb_API_KEY;
const TMDb_BASE_URL = process.env.TMDb_BASE_URL;

const tvResolvers = {
  Query: {
    tv: async (_, { id }) => {
      try {
        const tvResponse = await axios.get(`${TMDb_BASE_URL}/tv/${id}`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });
        const creditsResponse = await axios.get(`${TMDb_BASE_URL}/tv/${id}/credits`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });

        const tv = tvResponse.data;
        const creditsData = creditsResponse.data;
        return {
          id: tv.id,
          name: tv.name,
          firstAirDate: tv.first_air_date,
          summary: tv.overview,
          posterPath: tv.poster_path,
          voteAverage: tv.vote_average,
          numberOfSeasons: tv.number_of_seasons,
          numberOfEpisodes: tv.number_of_episodes,
          createdBy: tv.created_by.map(creator => ({
            name: creator.name,
          })),
          genres: tv.genres.map(genre => ({
            name: genre.name
          })),
          productionCountries: tv.production_countries.map(country => ({
            name: country.name,
          })),
          cast: creditsData.cast.map(castMember => ({
            name: castMember.name,
            character: castMember.character,
            profilePath: castMember.profile_path,
          })),
        };
      } catch (error) {
        console.error(`Failed to fetch tv show with id ${id}:`, error.response?.data || error);
        throw new Error(`Failed to fetch tv show with id ${id}.`);
      }
    },

    searchTv: async (_, { title }) => {
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/search/tv`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
            query: title,
          }
        });
        return response.data.results.map(tv => ({
          id: tv.id,
          name: tv.name,
          firstAirDate: tv.first_air_date,
          summary: tv.overview,
          posterPath: tv.poster_path,
          voteAverage: tv.vote_average,
        }));
      } catch (error) {
        console.error(`Failed to search tv shows with title ${title}:`, error.response?.data || error);
        throw new Error(`Failed to search tv shows with title ${title}.`);
      }
    },

    popularTv: async () => {
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/tv/popular`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });
        return response.data.results.map(tv => ({
          id: tv.id,
          name: tv.name,
          firstAirDate: tv.first_air_date,
          posterPath: tv.poster_path,
          voteAverage: tv.vote_average,
        }));
      } catch (error) {
        console.error("Failed to fetch popular tv shows:", error.response?.data || error);
        throw new Error("Failed to fetch popular tv shows.");
      }
    },

    airingTodayTv: async () => {
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/tv/airing_today`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });
        return response.data.results.map(tv => ({
          id: tv.id,
          name: tv.name,
          firstAirDate: tv.first_air_date,
          posterPath: tv.poster_path,
          voteAverage: tv.vote_average,
        }));
      } catch (error) {
        console.error("Failed to fetch tv shows airing today:", error.response?.data || error);
        throw new Error("Failed to fetch tv shows airing today.");
      }
    },

    topRatedTv: async () => {
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/tv/top_rated`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });
        return response.data.results.map(tv => ({
          id: tv.id,
          name: tv.name,
          firstAirDate: tv.first_air_date,
          posterPath: tv.poster_path,
          voteAverage: tv.vote_average,
        }));
      } catch (error) {
        console.error("Failed to fetch top rated tv shows:", error.response?.data || error);
        throw new Error("Failed to fetch top rated tv shows.");
      }
    },

    onTheAirTv: async () => {
      try {
        const response = await axios.get(`${TMDb_BASE_URL}/tv/on_the_air`, {
          params: {
            api_key: TMDb_API_KEY,
            language: 'en-US',
          }
        });
        return response.data.results.map(tv => ({
          id: tv.id,
          name: tv.name,
          firstAirDate: tv.first_air_date,
          posterPath: tv.poster_path,
          voteAverage: tv.vote_average,
        }));
      } catch (error) {
        console.error("Failed to fetch tv shows on the air:", error.response?.data || error);
        throw new Error("Failed to fetch tv shows on the air.");
      }
    },

  }
};

module.exports = tvResolvers;
