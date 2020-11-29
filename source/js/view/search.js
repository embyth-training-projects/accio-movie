import AbstractView from './abstract.js';

const createSearchFormTemplate = () => {
  return (
    `<form method="get" class="search-form" role="search">
      <fieldset>
        <legend class="search-legend">Cast the Accio spell on any movie</legend>
        <div class="fieldset-inner">
          <div class="input-field">
            <input type="search" id="query-search" class="search-input" name="query-search" autocomplete="off"
              autocapitalize="off" required aria-label="Search for a movie or TV show" value placeholder="Search">
            <label for="query-search" class="search-label">Cast here...</label>
            <button class="button search-submit" type="submit" aria-label="Search button" title="Search" disabled>
              <svg class="search-svg" width="20" height="20">
                <use xlink:href="img/sprite.svg#icon-search"></use>
              </svg>
            </button>
          </div>
        </div>
      </fieldset>
    </form>`
  );
};

export default class Search extends AbstractView {
  constructor() {
    super();

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._searchInputHandler = this._searchInputHandler.bind(this);

    this.getElement()
      .querySelector(`#query-search`)
      .addEventListener(`input`, this._searchInputHandler);
  }

  getTemplate() {
    return createSearchFormTemplate(this._isDisabled);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    const searchValue = this.getElement().querySelector(`#query-search`).value;
    this.getElement().querySelector(`#query-search`).disabled = true;
    this.getElement().querySelector(`.search-submit`).disabled = true;

    this._callback.formSubmit(searchValue);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _searchInputHandler(evt) {
    evt.preventDefault();

    const value = evt.target.value;
    const submitButton = this.getElement().querySelector(`.search-submit`);

    if (value === `` || value.match(/^ *$/) || value === null) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  enableInput() {
    this.getElement().querySelector(`#query-search`).disabled = false;
    this.getElement().querySelector(`.search-submit`).disabled = false;
  }
}
