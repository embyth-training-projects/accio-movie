import MovieCardView from '../view/movie-card.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class MovieCard {
  constructor(container) {
    this._container = container;
    this._cardComponent = null;
  }

  init(film) {
    this._cardComponent = new MovieCardView(film);
    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._cardComponent);
  }
}
