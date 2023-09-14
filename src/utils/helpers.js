import { SHORT_MOVIE_DURATION } from "./constants"

function filterMovies(movies, inputSearch) {
  const filteredMovies = movies.filter((movie) => {
    const search = inputSearch.toLowerCase().trim();
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    return movieRu.includes(search) || movieEn.includes(search);
  });
  return filteredMovies;
}

function filterDuration(movies) {
  return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
}

export {
  filterMovies,
  filterDuration,
};
