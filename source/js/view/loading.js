import AbstractView from './abstract.js';

const createLoadingTemplate = () => {
  return (
    `<li class="movie-loading">
      <h3>Loading...</h3>
    </li>`
  );
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
