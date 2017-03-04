(function() {
    'use strict';

    angular
        .module('agwUi')
        .directive('agwBackButton', agwBackButton);

    /** @ngInject */
    function agwBackButton() {
        var directive = {
            restrict: 'E',
            scope:{
                section: '@'
            },
            controller: BackButtonController,
            controllerAs: 'back',
            templateUrl: 'app/directives/backbutton/agw-back-button.html'
        };

        return directive;

        /** @ngInject */
        function BackButtonController($scope, $state){
            var vm = this;
            vm.goBack = function(){
              var parent = $state.current.params;
              if(parent){
                $state.go(parent.route);
              } else {
                $state.go('^');                
              }
            }
      }
  }

})();
