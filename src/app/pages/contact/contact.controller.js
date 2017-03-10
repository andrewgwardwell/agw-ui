(function() {
    'use strict';

    angular
        .module('agwUi')
        .controller('ContactController',['$analytics', ContactController]);

    /** @ngInject */
    function ContactController($analytics) {
    	$analytics.pageTrack('/contact');
    }
})();
