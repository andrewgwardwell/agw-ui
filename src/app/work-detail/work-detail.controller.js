(function() {
  'use strict';

  angular
    .module('agwUi')
    .controller('WorkDetailController', WorkDetailController);

  /** @ngInject */
  function WorkDetailController($log, $stateParams, projects, $uibModal) {
    // var _ = lodash;
    var vm = this;
    vm.nid = $stateParams.id;
    vm.openModal = _openModal;
    vm.openHeroModal = _openModal;
    $log.info(vm.nid);

    function _getById(){
      vm.fetching = true;
      projects.getProject({id: vm.nid}, function(response){
          $log.info('Success! Got project.');
          vm.data = response;
          vm.fetching = false;
        }, function(){
          $log.info('Error! Project fetch failed.');
          vm.fetching = false;
        });
    }


    function _openModal(image){
      $log.info(image);

      vm.modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/components/image-modal/image-modal.html',
        controller: 'ImageModalController',
        controllerAs: 'modalVm',
        resolve: {
          image: function(){return image}
        }
      }); 
    }

    _getById();
  }
})();
