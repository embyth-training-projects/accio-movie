import AbstractView from './abstract.js';
import {ListType} from '../const.js';

const createMovieListTemplate = (type, searchQuery) => {
  const titleText = type === ListType.SEARCH.TYPE ? `${ListType.SEARCH.TITLE} ${searchQuery}` : ListType[type].TITLE;

  return (
    `<section class="${ListType[type].CLASS}">
      <h2 class="section-heading">${titleText}</h2>
      <ul class="movie-list"></ul>
    </section>`
  );
};

export default class MovieList extends AbstractView {
  constructor(type, searchQuery = null) {
    super();

    this._type = type;
    this._searchQuery = searchQuery;
  }

  getTemplate() {
    return createMovieListTemplate(this._type, this._searchQuery);
  }

  getContainer() {
    return this.getElement().querySelector(`.movie-list`);
  }
}
