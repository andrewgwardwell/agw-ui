(function() {
    'use strict';

    angular
        .module('agwUi')
        .controller('ImageModalController', ImageModalController);

    /** @ngInject */
    function ImageModalController($scope, $log, image) {
        var vm = this;
        vm.image = image;

        function _init() {
            $log.info(vm);
        }
        _init();
    }
})();
