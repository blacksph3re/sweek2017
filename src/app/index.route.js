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
      .state('interns', {
        url: '/interns',
        templateUrl: 'app/interns/intern.html',
        controller: 'InternController',
        controllerAs: 'interns'
      });


    $urlRouterProvider.otherwise('/');
  }

})();
