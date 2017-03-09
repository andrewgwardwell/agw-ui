(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('BlogDetailController', BlogDetailController);

  /** @ngInject */
  function BlogDetailController($log, $stateParams, posts, util) {
    // var _ = lodash;
    var vm = this;
    vm.nid = $stateParams.id;
    vm.node = $stateParams.node;
    vm.trustTextHtml = util.trustTextHtml;
    $log.info(vm.node);

    function _getById(){
      vm.fetching = true;
      posts.getPost({id: vm.nid}, function(response){
          $log.info('Success! Got post.');
          vm.data = response;
          vm.fetching = false;
        }, function(){
          $log.info('Error! Project fetch failed.');
          vm.fetching = false;
        });
    }

    _getById();
  }
})();
