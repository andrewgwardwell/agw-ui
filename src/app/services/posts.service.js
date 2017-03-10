(function() {
'use strict';
var url = 'http://agw:8888/api';
var url = 'http://api.andrewgwardwell.com/api';
angular
//http://andrewgwardwell.com/api/node?parameters[type]=ent_project
  .module('agwUi')
  .factory('posts', ['$resource', function($resource) {
    return $resource(url, {
      id: '@id'
    },
    {
      'query': {
        method: 'GET',
        isArray: true,
        url: url + '/formatted-blog-posts'
      },
      'getPost': {
        method: 'GET',
        url: url + '/node/:id'
      }
    });
  }]);
})();
