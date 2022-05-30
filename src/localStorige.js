import { selectedMovie } from './fetchMovies';
let addToWatchedMowies = [];

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
  addToWatchedMowies = getMovies(movie);
  addToWatchedMowies.push(selectedMovie);
  localStorage.setItem(movie, JSON.stringify(addToWatchedMowies));
}

// function findMovieInLocalStorige() {
//   if (addToMowies.find(movie => selectedMovie.id === movie.id)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export function updateWatchedBtn(btn) {
//   if (!findMovieInLocalStorige()) {
//     console.log('false');
//     return;
//   } else {
//     btn.classList.add('is-active');
//     btn.textContent = 'remove from queue';
//     console.log('true');
//   }
// }
