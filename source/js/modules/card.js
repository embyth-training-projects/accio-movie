'use strict';

(function () {
  // Getting Media Poster Url
  var getMediaPoster = function (data, node) {
    if (data.info.poster_path) {
      node.querySelector('.movie-poster').src = window.util.URL.POSTERS + data.info.poster_path;
      node.querySelector('.movie-poster').alt = getMediaTitle(data);
    } else {
      node.querySelector('.movie-poster').src = window.util.CONSTANTS.POSTER_MOCK;
      node.querySelector('.movie-poster').alt = 'Poster not found';
    }
  };

  // Getting Media Title String
  var getMediaTitle = function (data) {
    var result;

    switch (data.info.media_type) {
      case 'movie':
        result = data.info.title || data.info.original_title;
        break;
      case 'tv':
        result = data.info.name || data.info.original_name;
        break;
      default:
        result = data.info.original_name || data.info.original_title;
        break;
    }

    return result;
  };

  // Getting Movie Director name or TV show network name
  var getMediaDirector = function (data, node) {
    switch (data.info.media_type) {
      case 'movie':
        var member = data.credits.crew.find(function (item) {
          return item.job === 'Director';
        });
        if (member) {
          node.querySelector('.movie-prod .directed').textContent = member.name;
          node.querySelector('.movie-prod .directed').title = 'Director';
        } else {
          node.querySelector('.movie-prod .production').remove();
        }
        break;
      case 'tv':
        if (data.details.networks[0]) {
          node.querySelector('.movie-prod .directed').textContent = data.details.networks[0].name;
          node.querySelector('.movie-prod .directed').title = 'Network';
        } else {
          node.querySelector('.movie-prod .production').remove();
        }
        break;
      default:
        node.querySelector('.movie-prod .production').remove();
        break;
    }
  };

  // Getting stringify release date
  var getReleaseDate = function (data) {
    var releaseDate = (data.info.media_type === 'movie') ? data.info.release_date : data.info.first_air_date;
    if (releaseDate) {
      var date = new Date(releaseDate);
      var day = date.toLocaleString('default', { day: 'numeric' });
      var month = date.toLocaleString('en-US', { month: 'short' });
      var year = date.toLocaleString('default', { year: 'numeric' });
      return day + ' ' + month + ' ' + year;
    } else {
      return 'TBD';
    }
  };

  // Getting css class by media rating
  var getMediaRating = function (data, node) {
    var value = data.info.vote_average;
    node.querySelector('.movie-rating .rating-value').textContent = value;

    if (value >= 7) {
      node.querySelector('.movie-rating .rating-value').classList.add('rating-value--good');
    } else if (value >= 4) {
      node.querySelector('.movie-rating .rating-value').classList.add('rating-value--normal');
    } else if (value > 0) {
      node.querySelector('.movie-rating .rating-value').classList.add('rating-value--bad');
    } else {
      node.querySelector('.movie-rating .rating-value').textContent = 'Not Yet Rated';
      node.querySelector('.movie-rating .rating-value--out-of').remove();
      node.querySelector('.movie-rating .rating-value').classList.add('rating-value--not-yet-rated');
    }
  };

  // Getting media genres string
  var getMediaGenres = function (data, node) {
    node.querySelector('.movie-genre .genre-value').textContent = '';
    var genres = data.details.genres;

    if (Array.isArray(genres) && genres.length) {
      for (var i = 0; i < genres.length; i++) {
        var separator = (i === genres.length - 1) ? '' : ', ';
        node.querySelector('.movie-genre .genre-value').textContent += genres[i].name + separator;
      }
    } else {
      node.querySelector('.movie-genre').remove();
    }
  };

  // Getting media plot
  var getMediaPlot = function (data, node) {
    var plot = data.info.overview;

    if (plot) {
      if (plot.length > window.util.CONSTANTS.MAX_PLOT_LENGTH) {
        plot = plot.substring(0, window.util.CONSTANTS.MAX_PLOT_LENGTH);
        plot = plot.substring(0, Math.min(plot.length, plot.lastIndexOf(' '))) + '...';
      }
      node.querySelector('.movie-plot').textContent = plot;
    } else {
      node.querySelector('.movie-plot').remove();
    }
  };

  // Getting imdb link
  var getIMDbLink = function (data, node) {
    if (data.ids.imdb_id) {
      node.querySelector('.links .imdb-link').href = window.util.CONSTANTS.IMDB_URL + data.ids.imdb_id;
    } else {
      node.querySelector('.links .imdb-link').remove();
    }
  };

  // Getting google link
  var getGoogleLink = function (data) {
    var releaseDate = (data.info.media_type === 'movie') ? data.info.release_date : data.info.first_air_date;
    var date = new Date(releaseDate);
    var year = date.toLocaleString('default', { year: 'numeric' });
    var title = getMediaTitle(data);
    var urledTitle = title.replace(/ /g, '+');
    return window.util.CONSTANTS.GOOGLE_URL + urledTitle + '+' + data.info.media_type + '+' + year;
  };

  // Generating movie card
  var getMovieCard = function (data) {
    var listElement = document.createElement('li');
    listElement.classList.add('movie-item');
    var cardTemplate = document.querySelector('#movie-item').content.querySelector('.movie-card').cloneNode(true);

    getMediaPoster(data, cardTemplate);
    cardTemplate.querySelector('.movie-title').textContent = getMediaTitle(data);
    getMediaDirector(data, cardTemplate);
    cardTemplate.querySelector('.movie-prod .released').textContent = getReleaseDate(data);
    getMediaRating(data, cardTemplate);
    getMediaGenres(data, cardTemplate);
    getMediaPlot(data, cardTemplate);
    getIMDbLink(data, cardTemplate);
    cardTemplate.querySelector('.links .google-link').href = getGoogleLink(data);

    listElement.appendChild(cardTemplate);
    return listElement;
  };

  // Rendering movie card into dom
  var renderCard = function (data, node) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getMovieCard(data));
    node.appendChild(fragment);
  };

  // Passing function in global scope
  window.card = {
    render: renderCard
  };
})();
