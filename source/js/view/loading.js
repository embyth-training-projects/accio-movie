import AbstractView from './abstract.js';

const createLoadingTemplate = () => {
  return (
    `<div class="movie-loading">
      <h3 class="movie-loading__text">Loading...</h3>
    </div>`
  );
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
