'use strict';

(function () {
  // Preccess trending server response
  var processTrendingResponse = function (data, node) {
    var trendingListNode = node.querySelector('.trending .movie-list');
    window.data.collect(data.results, trendingListNode);
    window.util.showElement(node);
  };

  // DOM Content loaded event handler
  var onDOMLoad = function () {
    var trendingParentNode = document.querySelector('.trending');

    // Loading Trending Movies from server
    fetch(window.util.URL.TRENDING)
      .then(response => window.util.handleResponse(response))
      .then(data => processTrendingResponse(data, trendingParentNode))
      .catch(error => console.log(error));

    window.search.activate();
  };

  document.addEventListener('DOMContentLoaded', onDOMLoad);
})();
