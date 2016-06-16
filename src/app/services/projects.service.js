(function() {
'use strict';

angular
  .module('agwUi')
  .factory('projects', function($resource) {
    return $resource('http://www.andrewgwardwell.com/node.json', {
      type: '@type'
    },
    {
      'delete': {
        method: 'DELETE',
        url: 'api/items/:id',
        params:{
          id: '@id'
        }
      },
      'query': {
        method: 'GET',
        url: 'api/items/:catno/',
        params:{
          catno:'@catno'
        }
      },
      'save': {
        method: 'POST'
      },
      'update': {
        method: 'PUT',
        url: 'api/items/:id',
        params: {
          id: '@itemId'
        }
      },
      'addToCart': {
        method: 'POST',
        url: 'api/carts/items/'
      }

    });
  });
})();
