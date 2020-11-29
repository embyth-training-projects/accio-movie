import LoadingView from '../view/loading.js';
import NoDataView from '../view/no-data.js';
import MovieListView from '../view/movie-list.js';
import MovieCardPresenter from '../presenter/card.js';
import SearchView from '../view/search.js';
import ErrorView from '../view/error.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition, ListType, UpdateType} from '../const.js';

export default class Page {
  constructor(searchContainer, listContainer, filmsModel, errorModel) {
    this._searchContainer = searchContainer;
    this._listContainer = listContainer;
    this._filmsModel = filmsModel;
    this._errorModel = errorModel;

    this._cardPresenter = {};

    this._isLoading = true;

    this._loadingComponent = new LoadingView();
    this._searchComponent = new SearchView();
    this._noDataComponent = new NoDataView();
    this._errorComponent = null;
    this._trendingFilmsComponent = new MovieListView(ListType.TRENDING.TYPE);
    this._searchListComponent = new MovieListView(ListType.SEARCH.TYPE);

    this._handleModelEvents = this._handleModelEvents.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvents);
    this._errorModel.addObserver(this._handleModelEvents);

    this._renderSearch();
    this._renderBoard();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _getError() {
    return this._errorModel.getError();
  }

  _handleModelEvents(updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.ERROR:
        this._isLoading = false;
        this._clearBoard();
        this._renderError();
        break;
    }
  }

  _renderLoading() {
    render(this._listContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoData() {
    render(this._listContainer, this._noDataComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSearch() {
    render(this._searchContainer, this._searchComponent, RenderPosition.BEFOREEND);
  }

  _renderError() {
    this._errorComponent = new ErrorView(this._getError());
    render(this._listContainer, this._errorComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(film) {
    const cardPresenter = new MovieCardPresenter(this._trendingFilmsComponent.getContainer());
    cardPresenter.init(film);
    this._cardPresenter[film.id] = cardPresenter;
  }

  _renderMovieList() {
    render(this._listContainer, this._trendingFilmsComponent, RenderPosition.AFTERBEGIN);
    this._getFilms().forEach((film) => this._renderCard(film));
  }

  _clearBoard() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    remove(this._loadingComponent);
    remove(this._noDataComponent);
    remove(this._trendingFilmsComponent);
    remove(this._searchListComponent);
    remove(this._errorComponent);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getFilms().length) {
      this._renderNoData();
      return;
    }

    this._renderMovieList();
  }
}
