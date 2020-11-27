import AbstractView from './abstract.js';

const createMovieCardTemplate = () => {
  return (
    `<li class="movie-item">
      <figure class="movie-card">
        <div class="poster-wrapper">
          <img class="movie-poster" src="img/poster.jpg" alt="Harry Potter and the Deathly Hallows: Part 2 Movie Poster">
        </div>
        <figcaption class="movie-info">
          <h3 class="movie-title">Harry Potter and the Deathly Hallows: Part 2</h3>

          <p class="movie-prod">
            <span class="production"><span>by&nbsp;</span><mark class="directed" title="Director">David
                Yates</mark><span>&nbsp;/&nbsp;</span></span>
            <i class="released" title="Release date">15 Jul 2011</i>
          </p>

          <p class="movie-rating" title="Movie rating">
            <svg class="rating-svg" width="20" height="20">
              <use xlink:href="img/sprite.svg#icon-star"></use>
            </svg>
            <b class="rating-value">8.1</b><small class="rating-value--out-of">&nbsp;/&nbsp;10</small>
          </p>

          <p class="movie-genre">
            <svg class="genre-svg" width="20" height="20">
              <use xlink:href="img/sprite.svg#icon-genre"></use>
            </svg>
            <i class="genre-value" title="Genres">Adventure, Drama, Fantasy, Mystery</i>
          </p>

          <p class="movie-plot">
            Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the
            Dark Lord
            as the final battle rages on at Hogwarts.
          </p>

          <div class="links">
            <a href="https://imdb.com/title/tt1201607" target="_blank" class="movie-link imdb-link">View on
              IMDb</a>
            <a href="https://google.com/search?q=Harry+Potter+and+the+Deathly+Hallows:+Part+2+movie+2011" target="_blank"
              class="movie-link google-link">Learn
              More</a>
          </div>
        </figcaption>
      </figure>
    </li>`
  );
};

export default class MovieCard extends AbstractView {
  getTemplate() {
    return createMovieCardTemplate();
  }
}
