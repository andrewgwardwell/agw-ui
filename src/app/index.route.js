(function() {
  'use strict';

  angular
    .module('agwUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    var home = {
        url: '/',
        templateUrl: 'app/pages/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
    };
    var work = {
        url: '/work',
        templateUrl: 'app/pages/work-parent/work-parent.html',
        controller: 'WorkParentController',
        controllerAs: 'workParent',
        params: {
          autoActivateChild: 'work.list'
        }
      };
    var workList = {
        url: '/list',
        templateUrl: 'app/pages/work/work.html',
        controller: 'WorkController',
        controllerAs: 'work'
    };
    var workDetail = {
        url: '/:id',
        templateUrl: 'app/pages/work-detail/work-detail.html',
        controller: 'WorkDetailController',
        controllerAs: 'wd'
    };
    var blog = {
        url: '/blog',
        templateUrl: 'app/pages/blog-parent/blog-parent.html',
        controller: 'BlogParentController',
        controllerAs: 'blogParent',
        params: {
          autoActivateChild: 'blog.list'
        }
    };
    var blogList = {
        url: '/list',
        templateUrl: 'app/pages/blog/blog.html',
        controller: 'BlogController',
        controllerAs: 'blog'
    };
    var blogDetail = {
        url: '/:id',
        templateUrl: 'app/pages/blog-detail/blog-detail.html',
        controller: 'BlogDetailController',
        controllerAs: 'bd'
    };
    var contact = {
        url: '/contact',
        templateUrl: 'app/pages/contact/contact.html',
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
      .state('blog.list', blogList)
      .state('blog.detail', blogDetail)
      .state('blog', blog)
      .state('contact', contact);

    $urlRouterProvider.otherwise('/');
  }

})();
