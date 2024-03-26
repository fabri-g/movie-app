// /services/user.service.js
const axios = require('axios');
const getManagementApiAccessToken = require('../utils/auth.utils'); // Assume this is the extracted function

const fetchUserFavorites = async (userId) => {
  const accessToken = await getManagementApiAccessToken();
  if (!accessToken) {
    throw new Error('Could not get access token for Management API');
  }

  const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.user_metadata?.favorites || [];
};

const updateUserFavorites = async (userId, item) => {
  const accessToken = await getManagementApiAccessToken();
  if (!accessToken) {
    throw new Error('Could not get access token for Management API');
  }

  const userResponse = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let favorites = userResponse.data.user_metadata?.favorites || [];
  const itemIndex = favorites.findIndex(fav => fav.id === item.id && fav.type === item.type);

  if (itemIndex === -1) {
    favorites.push(item);
  } else {
    favorites.splice(itemIndex, 1);
  }

  await axios.patch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
    user_metadata: { favorites },
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

module.exports = {
  fetchUserFavorites,
  updateUserFavorites,
};
