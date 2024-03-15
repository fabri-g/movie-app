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

// Update user metadata with favorites
router.post('/favorites', async (req, res) => {
  const userId = req.user.sub;
  const { favorites } = req.body;

  if (!userId || !favorites) {
    return res.status(400).send({ message: 'Missing userId or favorites in request.' });
  }

  const accessToken = await getManagementApiAccessToken();
  if (!accessToken) {
    return res.status(500).send({ message: 'Could not get access token' });
  }

  const options = {
    method: 'PATCH',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    data: {
      user_metadata: { favorites }
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.status(200).send({ message: 'Favorites updated successfully.', data: response.data });
  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).send({ message: 'Failed to update favorites', error: error.message });
  }

});

module.exports = router;
