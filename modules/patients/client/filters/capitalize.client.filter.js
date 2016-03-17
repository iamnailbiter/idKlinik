'use strict';

angular.module('patients').filter('capitalize',
  function () {
    return function (input) {
      // Capitalize directive logic
      // ...
      if (input !== null) {
        return input.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    };
  }
);
