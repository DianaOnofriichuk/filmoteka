import './css/styles.css';
import { refs, fetchTrendingMovies, fetchGenres } from './fetchMovies';
import createMarkup from './markup.js';
try {
  fetchTrendingMovies().then(movies => {
    createMarkup(movies);
  });
} catch (error) {
  console.log(error);
}

fetchGenres();
