// /api/auth.client.js
const axios = require('axios');
const getManagementApiAccessToken = require('../utils/auth.utils');

const auth0Client = axios.create({
  baseURL: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
});

// Request interceptor to add the auth token to every request
auth0Client.interceptors.request.use(async (config) => {
  const accessToken = await getManagementApiAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

module.exports = auth0Client;
