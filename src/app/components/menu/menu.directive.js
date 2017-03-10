(function() {
    'use strict';

    angular
        .module('agwUi')
        .directive('agwMenu', ['$log', '$timeout', '$interval', 'ngSnap', '_', agwMenu]);

    /** @ngInject */
    function agwMenu(){
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: 'app/components/menu/menu.html'
        };

        return directive;
    }
})();
