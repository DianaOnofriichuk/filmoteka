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
import { addToLocalstorige, updateWatchedBtn } from './localStorige';
let pageCounter = 1;
let searchValue = '';

// ////////////////////////// start page //////////////////////////////
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

//////////////////////// search movies ///////////////////////////////
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

// //////////////////////// open modal window ////////////////////////
refs.moviesListEl.addEventListener('click', onClickMovieCard);
function onClickMovieCard(e) {
  const openModal =
    e.target.nodeName === 'IMG' || e.target.nodeName === 'LI' || e.target.nodeName === 'P';

  if (!openModal) {
    return;
  } else {
    fetchOneMovie(e.target.id)
      .then(oneMovie => {
        createModalMarkup(oneMovie);
        addToWatched();
        addToQueue();
        refs.modalEl.classList.remove('is-hidden');
      })
      .catch(error => console.log(error));
  }
}

// ///////////////////////// add to watched ////////////////////////
function addToWatched() {
  const addToWatchedBtn = document.querySelector('.add-to-watched');
  addToWatchedBtn.addEventListener('click', onClickAddToWatchedBtn);
}
function onClickAddToWatchedBtn() {
  addToLocalstorige('addToWatchedMovie');
}

// /////////////////////// add to queue ///////////////////////////////
function addToQueue() {
  const addToQueueBtn = document.querySelector('.add-to-queue');
  addToQueueBtn.addEventListener('click', onClickAddToQueueBtn);
}
function onClickAddToQueueBtn() {
  addToLocalstorige('addToQueueMovie');
}

// ////////////////////////// close modal window /////////////////////
refs.modalCloseBtnEl.addEventListener('click', onModalClose);
function onModalClose() {
  refs.modalEl.classList.add('is-hidden');
  refs.modalContainerEl.innerHTML = '';
}
refs.backdropEl.addEventListener('click', onBackdropClose);
function onBackdropClose(e) {
  if (e.currentTarget === e.target) {
    onModalClose();
  }
}

// //////////////////////// home page ////////////////////
refs.homePageEl.addEventListener('click', getTrendingMovies);

//////////////////////// library page /////////////////////
refs.libraryPageEl.addEventListener('click', getSavedMovies);
function getSavedMovies() {
  libraryHeaderMarkup();
}
