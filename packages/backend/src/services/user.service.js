// /services/user.service.js
const auth0Client = require('../api/auth.client');

const fetchUserFavorites = async (userId) => {
  const response = await auth0Client.get(`/users/${encodeURIComponent(userId)}`);
  return response.data.user_metadata?.favorites || [];
};

const updateUserFavorites = async (userId, item) => {
  const userResponse = await auth0Client.get(`/users/${encodeURIComponent(userId)}`);

  let favorites = userResponse.data.user_metadata?.favorites || [];
  const itemIndex = favorites.findIndex(fav => fav.id === item.id && fav.type === item.type);

  if (itemIndex === -1) {
    favorites.push(item);
  } else {
    favorites.splice(itemIndex, 1);
  }

  await auth0Client.patch(`/users/${encodeURIComponent(userId)}`, {
    user_metadata: { favorites },
  });
};

module.exports = {
  fetchUserFavorites,
  updateUserFavorites,
};
