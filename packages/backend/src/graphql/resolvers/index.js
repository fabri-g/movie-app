// /src/resolvers/index.js
const movieResolvers = require('./movie.resolver');
const tvResolvers = require('./tv.resolver');

const resolvers = {
  Query: {
    ...movieResolvers.Query,
    ...tvResolvers.Query,
  },
  Mutation: {
  },
};

module.exports = resolvers;
