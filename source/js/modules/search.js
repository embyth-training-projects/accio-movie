'use strict';

(function () {
  // Checking response on availability of search results
  var processSearchResponse = function (data, node) {
    var listNode = node.querySelector('.movie-list');
    var sectionHeading = node.querySelector('.section-heading');

    var isMedia = data.results.find(function (item) {
      return item.media_type === 'tv' || item.media_type === 'movie';
    });

    if (isMedia && Array.isArray(data.results) && data.results.length && data.total_results > 0) {
      window.data.collect(data.results, listNode);
      window.util.showElement(sectionHeading);
      listNode.classList.remove('movie-list--full-width');
      window.util.showElement(node);
    } else {
      var notFoundTemplate = document.querySelector('#movie-not-found').content.querySelector('.movie-not-found').cloneNode(true);
      window.util.hideElement(sectionHeading);
      listNode.classList.add('movie-list--full-width');
      listNode.appendChild(notFoundTemplate);
      window.util.showElement(node);
    }
  };

  // Search submit event handler
  var onSearchSubmit = function (evt) {
    // Preventing default event
    evt.preventDefault();
    // Getting dom nodes
    var searchResultsNode = document.querySelector('.results');
    var searchHeading = searchResultsNode.querySelector('.section-heading');
    var searchResultsListNode = searchResultsNode.querySelector('.movie-list');
    var searchField = document.querySelector('#query-search');
    // Clearing previous results
    // window.util.hideElement(searchResultsNode);
    window.util.clearNode(searchResultsListNode);
    // Taking search value
    var value = searchField.value;
    // Editing heading
    searchHeading.textContent = 'Search results for ' + value;
    // Loading Search query from server
    fetch(window.util.URL.MULTI_SEARCH(value))
      .then(response => window.util.handleResponse(response))
      .then(data => processSearchResponse(data, searchResultsNode))
      .catch(error => console.log(error));
  };

  // Search input validation on empty value
  var onSearchInput = function (evt) {
    evt.preventDefault();

    var submitButton = document.querySelector('.search-submit');
    var target = evt.target;

    if (target.value === '' || target.value.match(/^ *$/) || target.value === null) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  };

  // Activating search query
  var activate = function () {
    var formNode = document.querySelector('.search-form');
    var searchField = formNode.querySelector('#query-search');

    formNode.addEventListener('submit', onSearchSubmit);
    searchField.addEventListener('input', onSearchInput);
  };

  // Disabling search query
  var disable = function () {
    var formNode = document.querySelector('.search-form');
    var searchField = formNode.querySelector('#query-search');

    formNode.removeEventListener('submit', onSearchSubmit);
    searchField.removeEventListener('input', onSearchInput);
  };

  // Passing functions to global scope
  window.search = {
    activate: activate,
    disable: disable
  };
})();
