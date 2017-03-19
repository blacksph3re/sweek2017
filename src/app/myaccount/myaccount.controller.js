(function() {
  'use strict';

  angular
    .module('sweek2017')
    .controller('MyAccountController', MyAccountController);

  /** @ngInject */
  function MyAccountController($rootScope, $scope, $http) {

    // $scope.isLoggedIn = function() {
    //
    //   $http.post('http://localhost:8080/user')
    //     .success(function(data) {
    //       console.log(data);
    //       $rootScope.loggedIn = data;
    //     })
    //     .error(function(data) {
    //       console.log('error: ' + data);
    //     });
    // };

  }
})();
