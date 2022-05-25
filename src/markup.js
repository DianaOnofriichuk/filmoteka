import { refs, receiveGenres } from './fetchMovies';
export default function createMarkup(movies) {
  const markup = movies.results
    .map(result => {
      return `<li class="movie-card">
     <img src=https://image.tmdb.org/t/p/w300/${result.poster_path} alt="${
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

  refs.moviesListEl.insertAdjacentHTML('beforeend', markup);
}
