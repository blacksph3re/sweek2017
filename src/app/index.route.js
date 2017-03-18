(function() {
  'use strict';

  angular
    .module('sweek2017')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('bubbles', {
        url: '/bubbles',
        templateUrl: 'app/bubbles/bubbles.html',
        controller: 'BubblesController',
        controllerAs: 'ctrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
