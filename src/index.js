import './css/styles.css';
import { refs, fetchTrendingMovies, fetchGenres, fetchMovies, fetchOneMovie } from './fetchMovies';
import {
  createListMarkup,
  homeHeaderMarkup,
  libraryHeaderMarkup,
  createModalMarkup,
} from './markup.js';
import { addToLocalstorige, findMovieInLocalStorige, removeFromLocalStorige } from './localStorige';
let pageCounter = 1;
let searchValue = '';
let watchedMowies = JSON.parse(localStorage.getItem('addToWatchedMovies'));
let QueueMowies = JSON.parse(localStorage.getItem('addToQueueMovies'));

// ////////////////////////// start page //////////////////////////////
function getTrendingMovies() {
  homeHeaderMarkup();
  fetchTrendingMovies()
    .then(trendingMovies => createListMarkup(trendingMovies.results))
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
        createListMarkup(movies.results);
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
        refs.backdropEl.classList.remove('is-hidden');
      })
      .catch(error => console.log(error));
  }
}

// ///////////////////////// add to watched ////////////////////////
function addToWatched() {
  const addToWatchedBtn = document.querySelector('.add-to-watched');
  findMovieInLocalStorige(addToWatchedBtn, 'addToWatchedMovies', `watched`);
  addToWatchedBtn.addEventListener('click', onClickAddToWatchedBtn);
}
function onClickAddToWatchedBtn(e) {
  if (e.target.textContent === 'Add to watched') {
    addToLocalstorige('addToWatchedMovies');
    watchedMowies = JSON.parse(localStorage.getItem('addToWatchedMovies'));
    e.target.classList.add('is-active');
    e.target.textContent = `remove from watched`;
  } else {
    removeFromLocalStorige('addToWatchedMovies');
    watchedMowies = JSON.parse(localStorage.getItem('addToWatchedMovies'));
    e.target.classList.remove('is-active');
    e.target.textContent = `Add to watched`;
  }
}

// /////////////////////// add to queue ///////////////////////////////
function addToQueue() {
  const addToQueueBtn = document.querySelector('.add-to-queue');
  findMovieInLocalStorige(addToQueueBtn, 'addToQueueMovies', `queue`);
  addToQueueBtn.addEventListener('click', onClickAddToQueueBtn);
}
function onClickAddToQueueBtn(e) {
  if (e.target.textContent === 'Add to queue') {
    addToLocalstorige('addToQueueMovies');
    QueueMowies = JSON.parse(localStorage.getItem('addToQueueMovies'));
    e.target.classList.add('is-active');
    e.target.textContent = `remove from queue`;
  } else {
    removeFromLocalStorige('addToQueueMovies');
    QueueMowies = JSON.parse(localStorage.getItem('addToQueueMovies'));
    e.target.classList.remove('is-active');
    e.target.textContent = `Add to queue`;
  }
}

// ////////////////////////// close modal window /////////////////////
refs.modalCloseBtnEl.addEventListener('click', onModalClose);
function onModalClose() {
  updateLibraryList();
  refs.backdropEl.classList.add('is-hidden');
  refs.modalContainerEl.innerHTML = '';
}
refs.backdropEl.addEventListener('click', onBackdropClose);
function onBackdropClose(e) {
  if (e.currentTarget === e.target) {
    onModalClose();
    updateLibraryList();
  }
}

function updateLibraryList() {
  if (refs.libraryButtonsListEl.classList.contains('header-central-container-toggle')) {
    return;
  } else if (refs.oueueBtn.classList.contains('is-active')) {
    createListMarkup(QueueMowies);
  } else {
    console.log(watchedMowies);
    createListMarkup(watchedMowies);
  }
}

// //////////////////////// home page ////////////////////
refs.homePageEl.addEventListener('click', getTrendingMovies);

//////////////////////// library page /////////////////////
refs.libraryPageEl.addEventListener('click', getSavedMovies);
function getSavedMovies() {
  libraryHeaderMarkup();
  onWatchedBtnClick();
}

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
function onWatchedBtnClick() {
  createListMarkup(watchedMowies);
  refs.oueueBtn.classList.remove('is-active');
  refs.watchedBtn.classList.add('is-active');
}

refs.oueueBtn.addEventListener('click', onQueueBtnClick);
function onQueueBtnClick() {
  createListMarkup(QueueMowies);
  refs.watchedBtn.classList.remove('is-active');
  refs.oueueBtn.classList.add('is-active');
}
