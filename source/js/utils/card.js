import {POSTER, IMDB_ENDPOINT, GOOGLE_ENDPOINT, GENRES_MAX_LENGTH, PLOT_MAX_LENGTH, RatingToClassName} from '../const.js';

export const getPosterImage = (film) => {
  const image = new Image();
  image.src = film.poster ? `${POSTER.END_POINT}${POSTER.RESOLUTION}${film.poster}` : POSTER.MOCK;
  image.alt = film.title;
  image.className = `movie-poster`;
  return image.outerHTML;
};

export const getIMDBLink = (id) => {
  return `${IMDB_ENDPOINT}${id}`;
};

export const getGoogleLink = (film) => {
  const releaseYear = new Date(film.release).toLocaleString(`default`, {year: `numeric`});
  const urledTitle = film.title.replace(/ /g, `+`);
  return `${GOOGLE_ENDPOINT}${urledTitle}+${releaseYear}`;
};

export const getGenresString = (genres) => {
  if (genres.length === 0) {
    return `Unknown`;
  }

  return genres
    .map((genre) => genre.name)
    .slice(0, GENRES_MAX_LENGTH)
    .join(`, `);
};

export const getDirectorString = (film) => {
  if (film.crew.length > 0) {
    if (film.crew.find((item) => item.job === `Director`)) {
      return film.crew.find((item) => item.job === `Director`).name;
    }
  }

  return `Unknown`;
};

export const getNetworkString = (film) => {
  if (film.network.length > 0) {
    return film.network[0].name;
  }

  return `Unknown`;
};

export const getFilmPlot = (plot) => {
  if (plot.length > PLOT_MAX_LENGTH) {
    let trimmedPlot = plot.substring(0, PLOT_MAX_LENGTH);
    trimmedPlot = trimmedPlot.slice(0, Math.min(trimmedPlot.length, trimmedPlot.lastIndexOf(` `)));

    if (/(,| |\.)/g.test(trimmedPlot.charAt(trimmedPlot.length - 1))) {
      trimmedPlot = trimmedPlot.slice(0, -1);
    }

    return trimmedPlot.concat(`...`);
  }

  return plot;
};

export const getReadableDate = (dateString) => {
  if (dateString === null) {
    return `TBD`;
  }

  const date = new Date(dateString);
  const day = date.toLocaleString(`en-US`, {day: `2-digit`});
  const month = date.toLocaleString(`en-US`, {month: `short`});
  const year = date.toLocaleString(`en-US`, {year: `numeric`});
  return `${day} ${month} ${year}`;
};

export const getRatingClass = (rating) => {
  if (rating >= 7) {
    return RatingToClassName.GOOD;
  } else if (rating < 7 && rating >= 5) {
    return RatingToClassName.NORMAL;
  } else if (rating < 5 && rating > 0) {
    return RatingToClassName.BAD;
  } else {
    return RatingToClassName.UNSET;
  }
};
