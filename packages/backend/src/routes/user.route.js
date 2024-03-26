const express = require('express');
const router = express.Router();
const { getUserFavorites, updateUserFavorites } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Apply JWT verification middleware
router.use(verifyToken);

router.get('/favorites', getUserFavorites);
router.patch('/favorites', updateUserFavorites);

module.exports = router;
