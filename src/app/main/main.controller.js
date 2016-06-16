(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(projects) {
    var vm = this;

    vm.active = 0;
    vm.art = [
      {title: 'one'}
    ];
    vm.work = [
      {title: 'two'}
    ];

    getProjects();

    function getProjects(){
      projects.get();
    };
  }
})();
