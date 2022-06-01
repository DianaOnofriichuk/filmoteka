import './css/styles.css';
import { refs, fetchTrendingMovies, fetchGenres, fetchMovies, fetchOneMovie } from './fetchMovies';
import {
  createListMarkup,
  homeHeaderMarkup,
  libraryHeaderMarkup,
  createModalMarkup,
} from './markup.js';
import {
  addToLocalstorige,
  findMovieInLocalStorige,
  removeFromLocalStorige,
  watchedMowies,
  queueMowies,
} from './localStorige';
let pageCounter = 1;
let searchValue = '';

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
        addToWatchedBtnActive();
        addToQueueBtnActive();
        refs.backdropEl.classList.remove('is-hidden');
      })
      .catch(error => console.log(error));
  }
}

// ///////////////////////// add to watched ////////////////////////
let addToWatchedBtn = {};

function addToWatchedBtnActive() {
  addToWatchedBtn = document.querySelector('.add-to-watched');
  findMovieInLocalStorige(addToWatchedBtn, 'addToWatchedMovies', `watched`);
  addToWatchedBtn.addEventListener('click', onClickAddToWatchedBtn);
}

function onClickAddToWatchedBtn(e) {
  if (e.target.textContent === 'Add to watched') {
    addToLocalstorige('addToWatchedMovies');
    addMovie(addToWatchedBtn, `watched`);
    removeMovie(addToQueueBtn, `queue`);
    removeFromLocalStorige('addToQueueMovies');
  } else {
    removeFromLocalStorige('addToWatchedMovies');
    removeMovie(addToWatchedBtn, `watched`);
  }
}
// /////////////////////// add to queue ///////////////////////////////
let addToQueueBtn = {};
function addToQueueBtnActive() {
  addToQueueBtn = document.querySelector('.add-to-queue');
  findMovieInLocalStorige(addToQueueBtn, 'addToQueueMovies', `queue`);
  addToQueueBtn.addEventListener('click', onClickAddToQueueBtn);
}
function onClickAddToQueueBtn(e) {
  if (e.target.textContent === 'Add to queue') {
    addToLocalstorige('addToQueueMovies');
    addMovie(addToQueueBtn, `queue`);
    removeMovie(addToWatchedBtn, `watched`);
    removeFromLocalStorige('addToWatchedMovies');
  } else {
    removeFromLocalStorige('addToQueueMovies');
    removeMovie(addToQueueBtn, `queue`);
  }
}
// //////////////// add/remove movie//////////////////////////////////////
function addMovie(Btn, BtnName) {
  Btn.classList.add('is-active');
  Btn.textContent = `remove from ${BtnName}`;
}
function removeMovie(Btn, BtnName) {
  Btn.classList.remove('is-active');
  Btn.textContent = `Add to ${BtnName}`;
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
    checkQueueContent();
  } else {
    checkWatchedContent();
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
  checkWatchedContent();
  refs.oueueBtn.classList.remove('is-active');
  refs.watchedBtn.classList.add('is-active');
}

refs.oueueBtn.addEventListener('click', onQueueBtnClick);
function onQueueBtnClick() {
  checkQueueContent();
  refs.watchedBtn.classList.remove('is-active');
  refs.oueueBtn.classList.add('is-active');
}
const url = './images/empty.PNG';
function checkWatchedContent() {
  if (watchedMowies.length !== 0) {
    createListMarkup(watchedMowies);
  } else {
    refs.moviesListEl.innerHTML = "<img src='./images/empty.PNG' alt='It is empty here' >";
  }
}

function checkQueueContent() {
  if (queueMowies.length !== 0) {
    createListMarkup(queueMowies);
  } else {
    const image = new Image();
    image.src = './images/empty.PNG';
    image.alt = 'It is empty here';
    refs.moviesListEl.appendChild(image);
  }
}
