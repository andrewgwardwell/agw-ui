(function() {
'use strict';
var url = 'http://agw:8888/api';
var url = 'http://api.andrewgwardwell.com/api';
angular
  .module('agwUi')
  .factory('posts', ['$resource', function($resource) {
    return $resource(url, {
      id: '@id'
    },
    {
      'query': {
        method: 'GET',
        url: url + '/formatted-blog-posts'
      },
      'getPost': {
        method: 'GET',
        url: url + '/node/:id'
      }
    });
  }]);
})();
