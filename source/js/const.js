export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`
};

export const ListType = {
  SEARCH: {
    TYPE: `SEARCH`,
    CLASS: `results`,
    TITLE: `Search results for`
  },
  TRENDING: {
    TYPE: `TRENDING`,
    CLASS: `trending`,
    TITLE: `Currently trending titles`
  }
};

export const SEARCH_SETTINGS = {
  LANGUAGE: `&language=en-US`,
  PAGE: `&page=1`,
  ADULT: `&include_adult=false`,
};

export const UpdateType = {
  INIT: `INIT`,
  ERROR: `ERROR`,
};

export const Mode = {
  DEFAULT: `TRENDING`,
  TRENDING: `TRENDING`,
  SEARCH: `SEARCH`,
};

export const POSTER = {
  END_POINT: `https://image.tmdb.org/t/p`,
  RESOLUTION: `/w500`
};

export const RatingToClassName = {
  BAD: `rating-value--bad`,
  NORMAL: `rating-value--normal`,
  GOOD: `rating-value--good`,
};

export const GENRES_MAX_LENGTH = 3;

export const PLOT_MAX_LENGTH = 200;

export const IMDB_ENDPOINT = `https://imdb.com/title/`;

export const GOOGLE_ENDPOINT = `https://google.com/search?q=`;
