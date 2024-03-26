// /controllers/userController.js
const userService = require('../services/user.service');

const getUserFavorites = async (req, res) => {
  const { sub: userId } = req.user;

  if (!userId) {
    return res.status(400).send({ message: 'Missing userId in request.' });
  }

  try {
    const favorites = await userService.fetchUserFavorites(userId);
    res.send({ favorites });
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    res.status(500).send({ message: 'Error fetching favorites', error: error.message });
  }
};

const updateUserFavorites = async (req, res) => {
  const { sub: userId } = req.user;
  const item = req.body;

  if (!userId || !item) {
    return res.status(400).send({ message: 'Missing userId or item in request.' });
  }

  try {
    await userService.updateUserFavorites(userId, item);
    res.send({ message: 'Favorites updated successfully' });
  } catch (error) {
    console.error('Error updating user metadata:', error);
    res.status(500).send({ message: 'Error updating favorites', error: error.message });
  }
};

module.exports = {
  getUserFavorites,
  updateUserFavorites,
};
