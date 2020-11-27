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
  getTemplate() {
    return createSearchFormTemplate();
  }
}
