// user.js
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const router = express.Router();

// Create a JWKS client
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Function to get the signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Custom middleware for logging and decoding the JWT token manually
router.use((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).send({ message: 'Token verification failed.', error: err });
    }
    req.user = decoded;
    next();
  });
});

// Get an access token for the Management API
async function getManagementApiAccessToken() {
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
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Management API Access Token:', error);
    return null;
  }
}

// Fetch user metadata with favorites
router.get('/favorites', async (req, res) => {
  const { sub: userId } = req.user;

  if (!userId) {
    return res.status(400).send({ message: 'Missing userId in request.' });
  }

  const accessToken = await getManagementApiAccessToken();
  if (!accessToken) {
    return res.status(500).send({ message: 'Could not get access token for Management API' });
  }

  try {
    // Fetch current user's metadata to get favorites
    const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    const favorites = response.data.user_metadata?.favorites || [];
    res.send({ favorites });
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    res.status(500).send({ message: 'Error fetching favorites', error: error.message });
  }
});

// Update user metadata with favorites
router.patch('/favorites', async (req, res) => {
  const { sub: userId } = req.user;
  const item = req.body;

  if (!userId || !item) {
    return res.status(400).send({ message: 'Missing userId or item in request.' });
  }

  const accessToken = await getManagementApiAccessToken();
  if (!accessToken) {
    return res.status(500).send({ message: 'Could not get access token for Management API' });
  }

  try {
    // Fetch current user's metadata
    const userResponse = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let favorites = userResponse.data.user_metadata?.favorites || [];
    const itemIndex = favorites.findIndex(fav => fav.id === item.id && fav.type === item.type);

    // Determine whether to add or remove the item
    if (itemIndex === -1) {
      favorites.push(item); // Add item to favorites
    } else {
      favorites.splice(itemIndex, 1); // Remove item from favorites
    }

    // Update user's metadata with new favorites list
    await axios.patch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`, {
      user_metadata: { favorites },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.send({ message: 'Favorites updated successfully' });
  } catch (error) {
    console.error('Error updating user metadata:', error);
    res.status(500).send({ message: 'Error updating favorites', error: error.message });
  }
});

module.exports = router;
