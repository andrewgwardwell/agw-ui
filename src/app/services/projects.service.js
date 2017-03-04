(function() {
'use strict';
var url = 'http://agw:8888/api';
var url = 'http://andrewgwardwell.com/api';

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
        url: url + '/term/selectNodes',
        isArray: true
      },
      'getProjects': {
        method: 'GET',
        isArray: true,
        url: url + '/formatted-nodes'
      },
      'getProject': {
        method: 'GET',
        url: url + '/node/:id'
      }
    });
  });
})();
