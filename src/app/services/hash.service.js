(function() {
'use strict';
var url = 'http://agw:8888/api/cache-hash';
// var url = 'http://api.andrewgwardwell.com/api';
angular
  .module('agwUi')
  .factory('hash', ['$resource', function($resource) {
    return $resource(url, {
     	type: '@type'
    },
    {
      'query': {
        method: 'GET',
        url: url + '/:type'
       }
    });
  }]);
})();
