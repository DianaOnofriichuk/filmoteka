import { selectedMovie } from './fetchMovies';
let addToMowies = [];
export let watchedMowies = JSON.parse(localStorage.getItem('addToWatchedMovies'));
export let queueMowies = JSON.parse(localStorage.getItem('addToQueueMovies'));
function getMovies(movie) {
  try {
    const localStorageItems = JSON.parse(localStorage.getItem(movie));
    if (localStorageItems) {
      return localStorageItems;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
export function addToLocalstorige(movie) {
  addToMowies = getMovies(movie);
  addToMowies.push(selectedMovie);
  localStorage.setItem(movie, JSON.stringify(addToMowies));
  watchedMowies = JSON.parse(localStorage.getItem('addToWatchedMovies'));
  queueMowies = JSON.parse(localStorage.getItem('addToQueueMovies'));
}

export function findMovieInLocalStorige(btn, key, btnName) {
  addToMowies = getMovies(key);
  if (addToMowies.length !== 0 && addToMowies.find(movie => selectedMovie.id === movie.id)) {
    btn.classList.add('is-active');
    btn.textContent = `remove from ${btnName}`;
  } else {
    return;
  }
}

export function removeFromLocalStorige(key) {
  addToMowies = getMovies(key);
  const newArray = addToMowies.filter(movie => movie.id !== selectedMovie.id);
  localStorage.setItem(key, JSON.stringify(newArray));
  watchedMowies = JSON.parse(localStorage.getItem('addToWatchedMovies'));
  queueMowies = JSON.parse(localStorage.getItem('addToQueueMovies'));
}
