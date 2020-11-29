import FilmsModel from '../model/films.js';
import {SEARCH_SETTINGS, MediaType} from '../const.js';

const searchSettings = `${SEARCH_SETTINGS.LANGUAGE}${SEARCH_SETTINGS.PAGE}${SEARCH_SETTINGS.ADULT}`;

const Method = {
  GET: `GET`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, apiKey) {
    this._endPoint = endPoint;
    this._apiKey = apiKey;
  }

  getTrending() {
    return this._load({url: `trending/all/week`})
      .then(Api.toJSON)
      .then((response) => response.results.map((film) => {
        return Promise.all([
          film,
          this._getDetails(film),
          this._getCredits(film),
          this._getIds(film)
        ]);
      }))
      .then((results) => Promise.all(results))
      .then((results) => results.map(FilmsModel.adaptToClient));
  }

  searchFilm(query) {
    return this._load({url: `search/multi`}, `${searchSettings}&query=${encodeURI(query)}`)
      .then(Api.toJSON)
      .then((response) => response.results.map((film) => {
        return Promise.all([
          film,
          this._getDetails(film),
          this._getCredits(film),
          this._getIds(film)
        ]);
      }))
      .then((results) => Promise.all(results))
      .then((results) => results.map(FilmsModel.adaptToClient))
      .then((results) => results.filter((item) => item.type === MediaType.TV || item.type === MediaType.MOVIE));
  }

  _getDetails(film) {
    return this._load({url: `${film.media_type}/${film.id}`})
      .then(Api.toJSON);
  }

  _getCredits(film) {
    return this._load({url: `${film.media_type}/${film.id}/credits`})
      .then(Api.toJSON);
  }

  _getIds(film) {
    return this._load({url: `${film.media_type}/${film.id}/external_ids`})
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }, settings = ``) {
    return fetch(
        `${this._endPoint}/${url}?api_key=${this._apiKey}${settings}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static toJSON(response) {
    return response.json();
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      return Promise.reject(response);
    }

    return response;
  }

  static catchError(error) {
    throw error;
  }
}
