import AbstractView from './abstract.js';
import {getPosterImage, getIMDBLink, getGoogleLink, getGenresString, getCreatorString, getFilmPlot, getReadableDate, getRatingClass} from '../utils/card.js';

const createMovieCardTemplate = (film) => {
  const posterImage = getPosterImage(film);
  const imdbSrc = getIMDBLink(film.imdbId);
  const googleSrc = getGoogleLink(film);
  const genresText = getGenresString(film.genres);
  const productionText = getCreatorString(film);
  const plotText = getFilmPlot(film.plot);
  const releaseText = getReadableDate(film.release);
  const ratingClass = getRatingClass(film.rating);

  return (
    `<li class="movie-item">
      <figure class="movie-card">
        <div class="poster-wrapper">
          ${posterImage}
        </div>
        <figcaption class="movie-info">
          <h3 class="movie-title">${film.title}</h3>

          <p class="movie-prod">
            <span class="production"><span>by&nbsp;</span><mark class="directed" title="${film.type === `tv` ? `Network` : `Director`}">
            ${productionText}</mark><span>&nbsp;/&nbsp;</span></span>
            <i class="released" title="Release date">${releaseText}</i>
          </p>

          <p class="movie-rating" title="Movie rating">
            <svg class="rating-svg" width="20" height="20">
              <use xlink:href="img/sprite.svg#icon-star"></use>
            </svg>
            <b class="rating-value ${ratingClass}">${film.rating}</b><small class="rating-value--out-of">&nbsp;/&nbsp;10</small>
          </p>

          <p class="movie-genre">
            <svg class="genre-svg" width="20" height="20">
              <use xlink:href="img/sprite.svg#icon-genre"></use>
            </svg>
            <i class="genre-value" title="${film.genres.length > 1 ? `Genres` : `Genre`}">${genresText}</i>
          </p>

          <p class="movie-plot">
            ${plotText}
          </p>

          <div class="links">
            <a href="${imdbSrc}" target="_blank" class="movie-link imdb-link">View on IMDb</a>
            <a href="${googleSrc}" target="_blank" class="movie-link google-link">Learn More</a>
          </div>
        </figcaption>
      </figure>
    </li>`
  );
};

export default class MovieCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createMovieCardTemplate(this._film);
  }
}
