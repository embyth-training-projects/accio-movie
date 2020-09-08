'use strict';

(function () {
  // Handling error messages
  var handle = function (response) {
    response.json()
      .then(function (response) {
        var mainTagNode = document.querySelector('.site-content .container');
        var errorMessageTemplate = document.querySelector('#error-message').content.querySelector('.error-message').cloneNode(true);
        var errorCodeNode = errorMessageTemplate.querySelector('.error-code');
        var errorMessageNode = errorMessageTemplate.querySelector('.error-text');

        errorCodeNode.textContent = response.status_code;
        errorMessageNode.textContent = response.status_message;
        mainTagNode.insertAdjacentElement('afterbegin', errorMessageTemplate);
        setTimeout(function () {
          errorMessageTemplate.remove();
        }, 5000);
      });
  };

  // Passing function to global scope
  window.error = {
    handle: handle
  };
})();
