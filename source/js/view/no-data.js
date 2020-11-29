import AbstractView from './abstract.js';

const createNoDataTemplate = () => {
  return (
    `<div class="movie-not-found">
      <h3>Nothing matches your search</h3>
      <p>But don't give up – check the spelling or try less specific search terms.</p>
    </div>`
  );
};

export default class NoData extends AbstractView {
  getTemplate() {
    return createNoDataTemplate();
  }
}
