// /src/schemas/tv.js
const { gql } = require('apollo-server-express');

const tvSchema = gql`
  extend type Query {
    tv(id: ID!): TV
    searchTv(title: String!): [TV]
    popularTv: [TV]
    airingTodayTv: [TV]
    topRatedTv: [TV]
    onTheAirTv: [TV]
  }

  type TV {
    id: ID!
    name: String!
    firstAirDate: String
    summary: String
    posterPath: String
    popularity: Float
    numberOfSeasons: Int
    numberOfEpisodes: Int
    genres: [Genre]
    voteAverage: Float
    voteCount: Int
    originalLanguage: String
    createdBy: [Creator]
    cast: [CastMember]
    productionCountries: [ProductionCountry]
  }

  type Genre {
    id: Int
    name: String
  }

  type Creator {
    id: Int
    name: String
  }

  type ProductionCountry {
    iso_3166_1: String
    name: String
  }

  type CastMember {
    adult: Boolean
    gender: Int
    id: ID!
    knownForDepartment: String
    name: String
    originalName: String
    popularity: Float
    profilePath: String
    castId: Int
    character: String
    creditId: String
    order: Int
  }

`;

module.exports = tvSchema;
