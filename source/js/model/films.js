import Observer from './observer.js';

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  static adaptToClient(results) {
    const [film, details, credits, ids] = results;

    return {
      title: details.name || details.title,
      originalTitle: details.original_name || details.original_title,
      genres: details.genres || [],
      release: details.first_air_date || details.release_date || null,
      plot: details.overview || ``,
      poster: details.poster_path || null,
      rating: details.vote_average || `-`,
      id: details.id,
      type: film.media_type,
      crew: credits.crew || [],
      imdbId: ids.imdb_id || null,
      network: details.networks || []
    };
  }
}
