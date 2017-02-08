(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(projects) {
    // var _ = lodash;
    var vm = this;
    vm.data = [];
    vm.active = 0;
    vm.skill = '';

    vm.filterSkills = function(){
      var ct = vm.skill.toLowerCase();
      vm.projects = _.filter(vm.data, function(i){
        if(ct == ''){
          return true;
        }
        var truth = false;
        _.each(i.terms, function(s){
          if(s.name.toLowerCase().indexOf(ct) > -1){
            truth = true;
          }
        });
        return truth;   
      });
    };

    getByTerms();

    function getByTerms(){
      projects.getProjects({}, function(response){
          vm.data = response;
          vm.projects = response;
        }, function(){

        });
    };

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
