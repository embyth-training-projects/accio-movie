import AbstractView from './abstract.js';

const createErrorTemplate = (error) => {
  return (
    `<div class="error-message">
      <h3>Network Error</h3>
      <p>Status Error Code:&nbsp;<b class="error-code">${error.code}</b>.<br>
        Error Message:&nbsp;<span class="error-text">${error.message}</span></p>
    </div>`
  );
};

export default class Error extends AbstractView {
  constructor(error) {
    super();

    this._error = error;
  }

  getTemplate() {
    return createErrorTemplate(this._error);
  }
}
