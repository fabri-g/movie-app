// /src/resolvers/index.js
const movieResolvers = require('./movie');

const resolvers = {
  Query: {
    ...movieResolvers.Query,
  },
  Mutation: {
  },
};

module.exports = resolvers;
