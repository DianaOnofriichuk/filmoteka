import './css/styles.css';
import { refs, fetchTrendingMovies, fetchGenres, fetchMovies } from './fetchMovies';
import createMarkup from './markup.js';
let pageCounter = 1;
let searchValue = '';
function getTrendingMovies() {
  try {
    fetchTrendingMovies().then(trendingMovies => {
      createMarkup(trendingMovies);
    });
    fetchGenres();
  } catch (error) {
    console.log(error);
  }
}
getTrendingMovies();
refs.homePageEl.addEventListener('click', getTrendingMovies);

refs.searchEl.addEventListener('submit', onSearchMovies);

function onSearchMovies(e) {
  e.preventDefault();

  searchValue = e.currentTarget.elements.searchQuery.value.trim();

  fetchMovies(searchValue, pageCounter)
    .then(movies => createMarkup(movies))
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
