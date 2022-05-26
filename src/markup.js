import { refs, receiveGenres } from './fetchMovies';
import img from './images/no-poster-available.jpg';

export default function createMarkup(movies) {
  const markup = movies.results
    .map(result => {
      return `<li class="movie-card">
     <img src=${addPoster(result.poster_path)} alt="${
        result.original_title
      }poster" loading="lazy" class="image"/>
     
       <p class="movie-name">
         ${result.original_title}
       </p>
       <p class="movie-genre">
       ${receiveGenres(result.genre_ids)} | ${result.release_date.slice(0, 4)}
     </p>
     
   </li>`;
    })
    .join('');

  refs.moviesListEl.innerHTML = markup;
}
function addPoster(posterWay) {
  if (posterWay) {
    return `https://image.tmdb.org/t/p/w300${posterWay}`;
  }
  return `${img}`;
}
