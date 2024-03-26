// /middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Create a JWKS client
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Function to get the signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Middleware for logging and decoding the JWT token manually
const verifyToken = (req, res, next) => {
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
};

module.exports = {
  verifyToken
};
