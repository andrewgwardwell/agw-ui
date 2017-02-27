(function() {
'use strict';

var key= 'nsakjGHR38220GWjq3Eg',
secret = 'Md66Q7UcfLN3cbpznGM9jol6fvh2SBwCQO7qzyEDkQk',
userId = 22490224,
url = 'https://www.goodreads.com/author/list/' + userId + '?format=json&key=' + key;
angular
//http://andrewgwardwell.com/api/node?parameters[type]=ent_project
  .module('agwUi')
  .factory('books', function($resource) {
    return $resource(url, {}, {
    	'query': {
        isArray: true,
        headers: {
        	'Access-Control-Allow-Origin': true
        }
      }
    });
  });
})();


