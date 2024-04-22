// /utils/auth.utils.js
const axios = require('axios');

let cachedToken = {
  accessToken: null,
  expiry: null
}

// Function to get an access token for the Management API
async function getManagementApiAccessToken() {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const bufferTime = 300;

  if (cachedToken.accessToken && cachedToken.expiry && cachedToken.expiry - currentTime > bufferTime) {
    return cachedToken.accessToken;
  }

  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    }
  };

  try {
    const response = await axios.request(options);
    const expiresIn = response.data.expires_in;
    cachedToken = {
      accessToken: response.data.access_token,
      expiry: currentTime + expiresIn
    };
    return cachedToken.accessToken;
  } catch (error) {
    console.error('Error fetching Management API Access Token:', error);
    throw new Error('Error fetching Management API Access Token');
  }
}

module.exports = getManagementApiAccessToken;
