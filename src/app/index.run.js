(function() {
    'use strict';

    angular
        .module('agwUi')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state) {

        $log.debug('runBlock end');

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            var aac;
            if (aac = toState && toState.params && toState.params.autoActivateChild) {
                $state.go(aac);
            }
        });
    }

})();
