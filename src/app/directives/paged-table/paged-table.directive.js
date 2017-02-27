(function() {
    'use strict';

    angular
        .module('agwUi')
        .directive('pagedTable', pagedTable);

    /** @ngInject */
    function pagedTable() {
        var directive = {
            restrict: 'E',
            scope:{
                refreshEvent: '@',
                navigateEvent: '@',
                editEvent: '@',
                removeEvent: '@',
                clearFilterEvent: '@',
                defaults: '=',
                data: '=',
                headers: '=',
                filters: '=',
                totalPages: '=',
                totalRecords: '=',
                previous: '=',
                next: '=',
                pagesize: '=',
                noAction: '@'
            },
            controller: pagedTableController,
            controllerAs: 'table',
            templateUrl: 'app/directives/paged-table.html'
        };

        return directive;

        /** @ngInject */
        function pagedTableController($scope){
            var vm = this;
            _init();

            //private
            function _init() {
                vm.page = parseInt($scope.defaults.page);
                vm.sort = $scope.defaults.sort;
                vm.direction = $scope.defaults.direction;
                vm.filter = '';
                vm.editEvent = $scope.editEvent;
            }

            //public
            //sorting
            vm.sortClick = function(column){
              if(column.sortable != false){
                vm.direction = vm.direction == 'ASC' ? 'DESC' : 'ASC';
                vm.sort = column.fieldName;
                vm.refreshData();
              }
            };
            // pagination
            vm.updatePage = function(){
              vm.refreshData();
            };
            //pagination size
            vm.updateSize = function(size){
                // console.log({size: size});
                $scope.pagesize = size;
                vm.refreshData();
            };
            //refresh function
            vm.refreshData = function(){
                var rObj = {
                  page: vm.page,
                  pagesize: $scope.pagesize,
                  sort: vm.sort,
                  direction: vm.direction,
                  filter: vm.filter
                };
                $scope.$emit($scope.refreshEvent, rObj);
            };
            vm.clearFilter = function(){
              var rObj = {
                page: vm.page,
                pagesize: $scope.pagesize,
                sort: vm.sort,
                direction: vm.direction
              };
              $scope.$emit($scope.clearFilterEvent, rObj);
            };
            //CRUD on items
            vm.removeItem = function(i){
                $scope.$emit($scope.removeEvent, i);
            };
            vm.navigateItem = function(i, h){
              if(angular.isDefined(h.navigate)){
                if(angular.isDefined(h.specialNavigate)){
                  $scope.$emit($scope.navigateEvent, i, h.specialNavigate);
                } else {
                  $scope.$emit($scope.navigateEvent, i);
                }
              }
            };
            vm.getValue = function(headerObject, data){
              var keys = headerObject.finder,
                  value = keys.length > 0 ? data: '';
                angular.forEach(keys, function(i){
                  if(value == null){
                    return '';
                  } else {
                    value = vm.finderFunction(i, value);
                  }
                });
              if(angular.isDefined(headerObject.specialFormat)){
                if(value == 'root'){
                  value = data;
                }
                value = headerObject.specialFormat(value);                  
              }
              if(value == 'root'){
                return data;
              } else {
                return value;                
              }
            };
            vm.finderFunction = function(key, data){
              if (key == 'root'){
                return key;
              } else {
                return angular.isDefined(data[key]) ? data[key] : null;                
              }
            };
        }
    }

})();
