// /src/utils/transformers.js

const transformMovies = (results) => results.map(movie => ({
  id: movie.id,
  title: movie.title,
  releaseDate: movie.release_date,
  posterPath: movie.poster_path,
  voteAverage: movie.vote_average,
}));

const transformTvShows = (results) => results.map(tv => ({
  id: tv.id,
  name: tv.name,
  firstAirDate: tv.first_air_date,
  posterPath: tv.poster_path,
  voteAverage: tv.vote_average,
}));

const transformSingleMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  releaseDate: movie.release_date,
  summary: movie.overview,
  posterPath: movie.poster_path,
  voteAverage: movie.vote_average,
  budget: movie.budget,
  revenue: movie.revenue,
  runtime: movie.runtime,
  productionCompanies: movie.production_companies.map(company => ({
    name: company.name,
  })),
  productionCountries: movie.production_countries.map(country => ({
    name: country.name,
  })),
  genres: movie.genres.map(genre => ({
    name: genre.name,
  })),
});

const transformSingleTV = (tv) => ({
  id: tv.id,
  name: tv.name,
  firstAirDate: tv.first_air_date,
  summary: tv.overview,
  posterPath: tv.poster_path,
  voteAverage: tv.vote_average,
  numberOfSeasons: tv.number_of_seasons,
  numberOfEpisodes: tv.number_of_episodes,
  createdBy: tv.created_by.map(creator => ({
    name: creator.name,
  })),
  genres: tv.genres.map(genre => ({
    name: genre.name,
  })),
  productionCountries: tv.production_countries.map(country => ({
    name: country.name,
  })),
});


const transformCreditsData = (creditsData) => ({
  cast: creditsData.cast.map(castMember => ({
    name: castMember.name,
    character: castMember.character,
    profilePath: castMember.profile_path,
  }))
});

// Export the transformation functions
module.exports = {
  transformMovies,
  transformTvShows,
  transformSingleMovie,
  transformSingleTV,
  transformCreditsData,
};
