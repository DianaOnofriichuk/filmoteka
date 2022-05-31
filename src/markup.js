import { refs, receiveGenres } from './fetchMovies';
import img from './images/no-poster-available.jpg';

export function homeHeaderMarkup() {
  refs.libraryPageEl.classList.remove('current-page');
  refs.homePageEl.classList.add('current-page');
  refs.headerEl.classList.remove('header-bg-library-page');
  refs.headerEl.classList.add('header-bg-home-page');
  refs.libraryButtonsListEl.classList.add('header-central-container-toggle');
  refs.formContainerEl.classList.remove('header-central-container-toggle');
}

export function libraryHeaderMarkup() {
  refs.homePageEl.classList.remove('current-page');
  refs.libraryPageEl.classList.add('current-page');
  refs.headerEl.classList.remove('header-bg-home-page');
  refs.headerEl.classList.add('header-bg-library-page');
  refs.formContainerEl.classList.add('header-central-container-toggle');
  refs.libraryButtonsListEl.classList.remove('header-central-container-toggle');
}

export function createListMarkup(results) {
  const markup = results
    .map(result => {
      return `<li class="movie-card" id=${result.id}>
     <img src=${addPoster(result.poster_path)} alt=${
        result.original_title
      }poster" loading="lazy" class="image" id=${result.id} />
     
       <p class="movie-name" id=${result.id}>
         ${result.original_title}
       </p>
       <p class="movie-genre" id=${result.id}>
       ${receiveGenres(result)} | ${result.release_date.slice(0, 4)}
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

export function createModalMarkup(oneMovie) {
  const modalMarkup = `
  <img class="modal-poster" src=${addPoster(oneMovie.poster_path)} alt=${oneMovie.original_title} />
  <div class="modal-text-container">
  <p class="modal-name">${oneMovie.title}</p>
  <ul class="modal-list list">
    <li class="modal-item">
      <p class="modal-info-name">Vote / Votes </p> 
       <p class="modal-value-rating">${oneMovie.vote_average}<p/><p class="modal-info-value">
      / ${oneMovie.vote_count}</p>
    </li>
    <li class="modal-item">
      <p class="modal-info-name">Popularity </p> <p class="modal-info-value">${
        oneMovie.popularity
      }</p>
    </li>
    <li class="modal-item">
      <p class="modal-info-name">Original Title </p><p class="modal-info-value">${
        oneMovie.original_title
      }</p>
    </li>
    <li class="modal-item">
      <p class="modal-info-name">Genre </p> <p class="modal-info-value">${receiveGenres(oneMovie)}
        </p>
    </li>
  </ul>
  <p class="modal-about">About</p>
  <p class="modal-description">${oneMovie.overview}</p>
  <div class="modal_buttns-container">
          <button type="button" class="modal-btn add-to-watched">Add to watched</button>
          <button type="button" class="modal-btn add-to-queue">Add to queue</button>
        </div>
  <div/>`;
  refs.modalContainerEl.innerHTML = modalMarkup;
}
