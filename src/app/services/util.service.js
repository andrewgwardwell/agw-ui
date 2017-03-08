(function() {
    'use strict';
    angular.module('agwUi')
        .factory('util', utilsService);

    function utilsService(moment) {
        function cacheSet(name, data) {

        }

        function cacheGet(name) {

        }

        function cacheDestroy() {}

        function srcSet(value, key){
          // $log.info(value);
            var set = value[key].xl_img + ' 1200w,' + value[key].lg_img + '  992w,' + value[key].md_img + '  768w,' + value[key].sm_img + ' 375w';
            return set;
        }

        function getGreeting() {
            var greeting, period;
            var time = moment().format('H');
            if (time > 6 && time <= 11) {
                greeting = 'Morning!';
                period = 'morning';
            } else if (time > 11 && time <= 18) {
                greeting = 'Afternoon!';
                period = 'afternoon';
            } else if (time > 18 && time <= 23) {
                greeting = "Evening!";
                period = 'evening';
            } else {
                greeting = "Go Sleep!"
                period = 'super-late';
            }
            return { greeting: greeting, period: period };
        }

        // function loadVendorsList() {
        //     if ($window.sessionStorage['vendorsList']) {
        //         vendorsList = angular.fromJson($window.sessionStorage['vendorsList']);
        //     } else {
        //         rVendor.query({ sort: 'company' }, function(result) {
        //             vendorsList = result.records;
        //             $window.sessionStorage['vendorsList'] = angular.toJson(vendorsList);
        //         });
        //     }
        // }

        // function getVendorsList() {
        //     return vendorsList;
        // }

        // function init() {
        //     loadVendorsList();
        // }

        // init();

        return {
            getGreeting: getGreeting,
            cacheGet: cacheGet,
            cacheSet: cacheSet,
            srcSet: srcSet
        };
    }
})();
