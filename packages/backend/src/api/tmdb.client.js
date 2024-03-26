// /src/api/tmdb.client.js
const axios = require('axios');
require('dotenv').config();

const TMDb_API_KEY = process.env.TMDb_API_KEY;
const TMDb_BASE_URL = process.env.TMDb_BASE_URL;

// Create an Axios instance with default properties
const axiosClient = axios.create({
  baseURL: TMDb_BASE_URL,
  params: {
    api_key: TMDb_API_KEY,
    language: 'en-US',
  },
});

module.exports = axiosClient;
