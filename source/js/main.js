import Api from './api/index.js';
import FilmsModel from './model/films.js';
import SearchModel from './model/search.js';
import ErrorModel from './model/error.js';
import PagePresenter from './presenter/page.js';
import {UpdateType} from './const.js';

const END_POINT = `https://api.themoviedb.org/3`;
const API_KEY = `fae583c1b46b878dbb53f8088eb03af6`;

const api = new Api(END_POINT, API_KEY);

const filmsModel = new FilmsModel();
const searchModel = new SearchModel();
const errorModel = new ErrorModel();

const searchFormParent = document.querySelector(`.header-inner`);
const movieListParent = document.querySelector(`.site-content .container`);

const pagePresenter = new PagePresenter(searchFormParent, movieListParent, filmsModel, searchModel, errorModel, api);

pagePresenter.init();

api.getTrending()
  .then((films) => filmsModel.setFilms(UpdateType.INIT, films))
  .catch((error) => Api.toJSON(error).then((jsonedError) => errorModel.setError(UpdateType.ERROR, ErrorModel.adaptToClient(jsonedError))));
