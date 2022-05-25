export const refs = {
  moviesListEl: document.querySelector('.movies-list'),
  searchEl: document.querySelector('.submit-btn'),
};
export async function fetchTrendingMovies() {
  const KEY = '4a38965c8274ee66c1019c21406c4653';
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`);
  const movies = await response.json();
  localStorage.setItem('movies', JSON.stringify(movies));
  return movies;
}

export async function fetchGenres() {
  if (!localStorage.getItem('genres')) {
    const KEY = '4a38965c8274ee66c1019c21406c4653';
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`,
    );
    const { genres } = await response.json();
    localStorage.setItem('genres', JSON.stringify(genres));
  } else {
    return;
  }
}
export function receiveGenres(genresId) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  const genresArray = [];
  genres.map(genre => {
    if (genresId.includes(genre.id)) {
      genresArray.push(genre.name);
    }
  });

  if (genresArray.length > 2) {
    genresArray.splice(2);
    genresArray.push('Other');
  }

  return genresArray.join(', ');
}
