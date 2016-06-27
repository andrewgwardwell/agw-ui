(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(projects) {
    var vm = this;
    vm.data = [];
    vm.active = 0;
    vm.art = [
      {title: 'one'}
    ];
    vm.work = [
      {title: 'two'}
    ];

    getProjects();

    function getProjects(){
      projects.getProjects({'parameters[type]': 'ent_project'}, function(response){
        vm.work = response;
        getFull(response);
      }, function(response){
        vm.error = true;
      });
    };
    function getFull(responses){
      angular.forEach(responses, function(item){
        var id = item.nid;
        projects.getProject({id: id}, function(response){
          vm.push(response);
        }, function(response){

        });
      });    
    };
  }
})();
