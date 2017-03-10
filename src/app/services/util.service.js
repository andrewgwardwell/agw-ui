(function() {
    'use strict';
    angular.module('agwUi')
        .factory('util', ['moment', '$sce', '$window', utilsService]);

    function utilsService(moment, $sce, $window) {
        function cacheSet(name, data) {
           if ($window.sessionStorage) {
                $window.sessionStorage[name] = angular.toJson(data);
            }
        }

        function cacheGet(name) {
           if ($window.sessionStorage[name]) {
                return angular.fromJson($window.sessionStorage[name]);
            } else {
                return false;
            }
        }

        function cacheDestroy(name) {
            $window.sessionStorage[name] = '';
        }

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

        function trustTextHtml(text){
            return $sce.trustAsHtml(text);
        };

        return {
            getGreeting: getGreeting,
            cacheGet: cacheGet,
            cacheSet: cacheSet,
            srcSet: srcSet,
            agwTrustTextHtml: trustTextHtml
        };
    }
})();
