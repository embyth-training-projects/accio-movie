import AbstractView from './abstract.js';

const createErrorTemplate = () => {
  return (
    `<div class="error-message">
      <h3>Network Error</h3>
      <p>Status Error Code:&nbsp;<b class="error-code">404</b>.<br>
        Error Message:&nbsp;<span class="error-text">Resource Not Found</span></p>
    </div>`
  );
};

export default class Error extends AbstractView {
  getTemplate() {
    return createErrorTemplate();
  }
}
