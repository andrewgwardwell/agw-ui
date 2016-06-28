(function() {
'use strict';
var url = 'http://www.andrewgwardwell.com/api';
angular
//http://andrewgwardwell.com/api/node?parameters[type]=ent_project
  .module('agwUi')
  .factory('projects', function($resource) {
    return $resource(url, {
      type: '@type',
      id: '@id'
    },
    {
      'getProjectsByTerm': {
        method: 'POST',
        url: url + '/taxonomy_term/selectNodes',
        isArray: true
      },
      'getProjects': {
        method: 'GET',
        isArray: true,
        url: url + '/node'
      },
      'getProject': {
        method: 'GET',
        url: url + '/node/:id'
      }
    });
  });
})();
