(function() {
'use strict';
var url = 'http://www.andrewgwardwell.com/api/node';
angular
//http://andrewgwardwell.com/api/node?parameters[type]=ent_project
  .module('agwUi')
  .factory('projects', function($resource) {
    return $resource(url, {
      type: '@type',
      id: '@id'
    },
    {
      'getProjects': {
        method: 'GET',
        isArray: true
      },
      'getProject': {
        method: 'GET',
        url: url + '/:id'
      }
    });
  });
})();
