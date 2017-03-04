(function() {
  'use strict';

  angular
    .module('agwUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    var home = {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
    };
    var work = {
        url: '/work',
        templateUrl: 'app/work-parent/work-parent.html',
        controller: 'WorkParentController',
        controllerAs: 'workParent',
        params: {
          autoActivateChild: 'work.list'
        }
      };
    var workList = {
        url: '/list',
        templateUrl: 'app/work/work.html',
        controller: 'WorkController',
        controllerAs: 'work'
    };
    var workDetail = {
        url: '/:id',
        templateUrl: 'app/work-detail/work-detail.html',
        controller: 'WorkDetailController',
        controllerAs: 'wd'
    };
    var contact = {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact',
        params: {
          route: 'home'
        }
    };
    $stateProvider
      .state('home', home)
      .state('work.list', workList)
      .state('work.detail', workDetail)
      .state('work', work)
      .state('contact', contact);

    $urlRouterProvider.otherwise('/');
  }

})();
