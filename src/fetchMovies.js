export const refs = {
  moviesListEl: document.querySelector('.movies-list'),
  homePageEl: document.querySelector('.home-page-js'),
  libraryPageEl: document.querySelector('.library-page-js'),
  headerEl: document.querySelector('.header'),
  libraryButtonsListEl: document.querySelector('.library-buttons-list'),
  formContainerEl: document.querySelector('.form-container'),
  searchEl: document.querySelector('.search-form'),
  notificationEl: document.querySelector('.search-failure-text'),
  modalContainerEl: document.querySelector('.modal_movie-container'),
  modalCloseBtnEl: document.querySelector('.modal-close-btn'),
  backdropEl: document.querySelector('.backdrop'),
  watchedBtn: document.querySelector('.watched-btn-js'),
  oueueBtn: document.querySelector('.queue-btn-js'),
  container: document.getElementById('tui-pagination-container'),
  loaderEl: document.querySelector('.loader'),
};
const KEY = '4a38965c8274ee66c1019c21406c4653';
export let selectedMovie = '';

export async function fetchTrendingMovies(_, pageCounter) {
  refs.loaderEl.classList.remove('loader_not-active');

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}&page=${pageCounter}`,
  );
  const trendingMovies = await response.json();
  localStorage.setItem('movies', JSON.stringify(trendingMovies));

  refs.loaderEl.classList.add('loader_not-active');
  return trendingMovies;
}

export async function fetchGenres() {
  if (!localStorage.getItem('genres')) {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`,
    );
    const { genres } = await response.json();
    localStorage.setItem('genres', JSON.stringify(genres));
  } else {
    return;
  }
}

export async function fetchMovies(movieName, pageCounter) {
  refs.loaderEl.classList.remove('loader_not-active');
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${movieName}&language=en-US&page=${pageCounter}&include_adult=false`,
  );
  const movies = await response.json();
  localStorage.setItem('movies', JSON.stringify(movies));
  refs.loaderEl.classList.add('loader_not-active');
  return movies;
}

export async function fetchOneMovie(movieName) {
  refs.loaderEl.classList.remove('loader_not-active');
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieName}?api_key=${KEY}&language=en-US`,
  );
  selectedMovie = await response.json();
  refs.loaderEl.classList.add('loader_not-active');
  return selectedMovie;
}

// /////////////// receive genres /////////////////////////
export function receiveGenres(result) {
  if (result.genres !== undefined) {
    return receiveOneMovieGenres(result.genres);
  } else {
    return receiveGenresById(result.genre_ids);
  }
}
function receiveGenresById(genresId) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  const genresArray = [];

  genres.map(genre => {
    if (genresId.includes(genre.id)) {
      genresArray.push(genre.name);
    }
  });

  if (genresArray.length > 2) {
    genresArray.splice(2);
    genresArray.push('Other');
  }
  return genresArray.join(', ');
}

function receiveOneMovieGenres(genres) {
  const genreName = [];
  genres.map(genre => {
    genreName.push(genre.name);
  });
  return genreName.join(', ');
}
