// /src/resolvers/index.js
const movieResolvers = require('./movie');
const tvResolvers = require('./tv');

const resolvers = {
  Query: {
    ...movieResolvers.Query,
    ...tvResolvers.Query,
  },
  Mutation: {
  },
};

module.exports = resolvers;
