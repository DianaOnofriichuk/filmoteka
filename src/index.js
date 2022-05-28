import './css/styles.css';
import {
  refs,
  fetchTrendingMovies,
  fetchGenres,
  fetchMovies,
  fetchOneMovie,
  selectedMovie,
} from './fetchMovies';
import {
  createMarkup,
  homeHeaderMarkup,
  libraryHeaderMarkup,
  createModalMarkup,
} from './markup.js';
let pageCounter = 1;
let searchValue = '';

function getTrendingMovies() {
  homeHeaderMarkup();
  fetchTrendingMovies()
    .then(trendingMovies => createMarkup(trendingMovies))
    .catch(error => {
      notificationError();
      console.log(error);
    });
  fetchGenres();
}

getTrendingMovies();

refs.homePageEl.addEventListener('click', getTrendingMovies);

refs.searchEl.addEventListener('submit', onSearchMovies);

function onSearchMovies(e) {
  e.preventDefault();

  searchValue = e.currentTarget.elements.searchQuery.value.trim();

  fetchMovies(searchValue, pageCounter)
    .then(movies => {
      if (movies.results.length !== 0) {
        createMarkup(movies);
      } else {
        notificationError();
      }
    })
    .catch(error => {
      notificationError();
      console.log(error);
    });
  pageCounter += 1;
}

function notificationError() {
  refs.notificationEl.textContent = 'Search result not successful. Enter the correct movie name';
  setTimeout(() => {
    refs.notificationEl.textContent = '';
  }, 2000);
}

refs.libraryPageEl.addEventListener('click', getSavedMovies);
function getSavedMovies() {
  libraryHeaderMarkup();
}

refs.moviesListEl.addEventListener('click', onClickMovieCard);
function onClickMovieCard(e) {
  const openModal =
    e.target.nodeName === 'IMG' || e.target.nodeName === 'LI' || e.target.nodeName === 'P';

  if (!openModal) {
    return;
  } else {
    refs.modalEl.classList.remove('is-hidden');
    fetchOneMovie(e.target.id)
      .then(oneMovie => {
        createModalMarkup(oneMovie);
      })
      .catch(error => console.log(error));
  }
}

refs.modalCloseBtnEl.addEventListener('click', onModalClose);
function onModalClose() {
  refs.modalEl.classList.add('is-hidden');
  refs.modalContainerEl.innerHTML = '';
}
