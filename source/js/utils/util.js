'use strict';

(function () {
  // API setup
  var API = {
    KEY: '?api_key=fae583c1b46b878dbb53f8088eb03af6',
    URL: 'https://api.themoviedb.org/3',
    MODULE: {
      MULTI_SEARCH: '/search/multi',
      TRENDING: '/trending/all/week',
      TV: '/tv',
      MOVIE: '/movie',
      GET_CREDITS: '/credits',
      GET_IDS: '/external_ids'
    },
    SETTING: {
      LANG: '&language=en-US',
      PAGE: '&page=1',
      ADULT: '&include_adult=false'
    },
    POSTERS: {
      URL: 'https://image.tmdb.org/t/p',
      RESOLUTION: '/w500'
    }
  };

  window.util = {
    // Project Constants
    CONSTANTS: {
      GOOGLE_URL: 'https://google.com/search?q=',
      IMDB_URL: 'https://imdb.com/title/',
      POSTER_MOCK: 'img/poster-mock.jpg',
      MAX_PLOT_LENGTH: 200
    },
    // Get complete URLs
    URL: {
      get TRENDING() {
        return API.URL + API.MODULE.TRENDING + API.KEY;
      },
      get POSTERS() {
        return API.POSTERS.URL + API.POSTERS.RESOLUTION;
      },
      MULTI_SEARCH: function (query) {
        query = '&query=' + query.replace(/ /g, '%20').toLowerCase();
        return API.URL + API.MODULE.MULTI_SEARCH + API.KEY + API.SETTING.LANG + query + API.SETTING.PAGE + API.SETTING.ADULT;
      },
      DETAILS: function (type, id) {
        return API.URL + '/' + type + '/' + id + API.KEY;
      },
      CREDITS: function (type, id) {
        return API.URL + '/' + type + '/' + id + API.MODULE.GET_CREDITS + API.KEY;
      },
      GET_IDS: function (type, id) {
        return API.URL + '/' + type + '/' + id + API.MODULE.GET_IDS + API.KEY;
      }
    },

    // Project utilities functions
    showElement: function (node) {
      node.classList.remove('visually-hidden');
    },
    hideElement: function (node) {
      node.classList.add('visually-hidden');
    },
    clearNode: function (node) {
      while (node.firstChild) {
        node.firstChild.remove();
      }
    },
    handleResponse: function (response) {
      if (response.ok) {
        return response.json();
      } else {
        window.error.handle(response);
      }
    }
  };
})();
