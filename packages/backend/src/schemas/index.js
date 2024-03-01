// /src/schemas/index.js
const { gql } = require('apollo-server-express');
const movieSchema = require('./movie');

// A root schema to hold the base Query and Mutation type
const rootSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = [
  rootSchema,
  movieSchema,
];
