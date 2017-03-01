(function() {
    'use strict';

    angular
        .module('agwUi')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state) {

        $log.debug('runBlock end');

        var stateChange = $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            var aac = toState;
            if (aac && toState.params && toState.params.autoActivateChild) {
                $state.go(aac);
            }
        });
        $rootScope.$on('$destroy', function() {
            stateChange();
        });
    }

})();
