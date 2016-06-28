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
    vm.art = [];
    vm.work = [];
    // getProjects();
    getByTerms();

    function getByTerms(){
      var art = {tid: 4};
      var work = {tid: 5};
      projects.getProjectsByTerm(art, function(response){
          vm.art = response;
        }, function(){

        });
      projects.getProjectsByTerm(work, function(response){
          vm.work = response;
        }, function(){

        });
    };

    // function getProjects(){
    //   projects.getProjects({'parameters[type]': 'ent_project'}, function(response){
    //     getFull(response);
    //   }, function(response){
    //     vm.error = true;
    //   });
    // };
    // function getFull(responses){
    //   angular.forEach(responses, function(item){
    //     var id = item.nid;
    //     projects.getProject({id: id}, function(response){
    //       // 4 = art
    //       var type = extrractFieldSingle('field_ent_project_type_vocref', 'tid', response);
    //       if(type === '4'){
    //         vm.art.push(response);
    //       } else {
    //         vm.work.push(response);
    //       }
    //     }, function(response){

    //     });
    //   });    
    // };
    function extrractFieldSingle(field, idKey, data){
      var field = data[field].und;
      if (field & field.length > 0) {
        return field[0][idKey];
      } else {
        return false;
      }
    };
  }
})();
