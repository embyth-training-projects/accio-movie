'use strict';

(function () {
  // Loading additional data
  var loadData = async function (item) {
    var data = {
      info: item
    };

    try {
      var [creditsResponse, detailsResponse, idsResponse] = await Promise.all([
        fetch(window.util.URL.CREDITS(item.media_type, item.id)),
        fetch(window.util.URL.DETAILS(item.media_type, item.id)),
        fetch(window.util.URL.GET_IDS(item.media_type, item.id))
      ]);

      var credits = await creditsResponse.json();
      var details = await detailsResponse.json();
      var ids = await idsResponse.json();

      data.credits = credits;
      data.details = details;
      data.ids = ids;
    } catch (error) {
      console.log(error);
    }

    return data;
  };

  // Collacting data for each result position
  var collectData = function (response, parentNode) {
    response.forEach(function (item) {
      if (!(item.media_type === 'person')) loadData(item).then(data => window.card.render(data, parentNode));
    });
  };

  // Passing function in global scope
  window.data = {
    collect: collectData
  };
})();
