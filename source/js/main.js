import SearchView from './view/search.js';
import Api from './api/index.js';
import {render} from './utils/render.js';
import {RenderPosition} from './const.js';

const END_POINT = `https://api.themoviedb.org/3`;
const API_KEY = `fae583c1b46b878dbb53f8088eb03af6`;

const api = new Api(END_POINT, API_KEY);

api.getTrending()
  .then((response) => console.log(response));

const searchFormParent = document.querySelector(`.header-inner`);
const movieListParent = document.querySelector(`.site-content .container`);

render(searchFormParent, new SearchView(), RenderPosition.BEFOREEND);
