(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('WorkDetailController', WorkDetailController);

  /** @ngInject */
  function WorkDetailController($log, $stateParams, projects) {
    // var _ = lodash;
    var vm = this;
    vm.nid = $stateParams.id;
    $log.info(vm.nid);

    function getById(){
      vm.fetching = true;
      projects.getProject({id: vm.nid}, function(response){
          $log.info('Success! Got project.');
          vm.data = response;
          vm.fetching = false;
        }, function(){
          $log.info('Error! Project fetch failed.');
          vm.fetching = false;
        });
    };

    getById();
  }
})();
