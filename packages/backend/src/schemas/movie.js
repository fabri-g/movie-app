// /src/schemas/movie.js
const { gql } = require('apollo-server-express');

const movieSchema = gql`
  extend type Query {
    movie(id: ID!): Movie
    searchMovies(title: String!): [Movie]
    popularMovies: [Movie]
  }

  type Movie {
    id: ID!
    title: String!
    releaseDate: String
    summary: String
    posterPath: String
    popularity: Float
    genreIds: [Int] 
    genres: [Genre] 
    voteAverage: Float
    voteCount: Int
    adult: Boolean 
    budget: Int 
    backdropPath: String 
    originalLanguage: String 
    productionCompanies: [ProductionCompany] 
    productionCountries: [ProductionCountry] 
    revenue: Int 
    runtime: Int 
    cast: [CastMember]
  }

  type Genre {
    id: Int
    name: String
  }
  
  type ProductionCompany {
    id: Int
    logoPath: String
    name: String
    originCountry: String
  }
  
  type ProductionCountry {
    iso_3166_1: String
    name: String
  }
  
  type SpokenLanguage {
    englishName: String
    iso_639_1: String
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

module.exports = movieSchema;
