import Observer from './observer.js';

export default class Error extends Observer {
  constructor() {
    super();

    this._error = null;
  }

  setError(updateType, error) {
    this._error = Object.assign({}, error);

    this._notify(updateType);
  }

  getError() {
    return this._error;
  }

  static adaptToClient(error) {
    return {
      code: error.status_code,
      message: error.status_message
    };
  }
}
