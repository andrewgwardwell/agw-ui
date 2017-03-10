(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('BlogDetailController',['$log', '$stateParams', 'posts', 'util', '$analytics', BlogDetailController]);

  /** @ngInject */
  function BlogDetailController($log, $stateParams, posts, util, $analytics) {
    $analytics.pageTrack('/blog/'+$stateParams.id);
    // var _ = lodash;
    var vm = this;
    vm.nid = $stateParams.id;
    vm.node = $stateParams.node;
    vm.trustTextHtml = util.agwTrustTextHtml;
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
