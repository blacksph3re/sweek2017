(function () {
  'use strict';

  angular
    .module('sweek2017')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($http, $rootScope, $location) {

    var vm = this;

    vm.submit = submit;
    vm.username = null;
    vm.password = null;

    function submit() {

      $rootScope.loggedIn = true;

      $location.path('/myAccount');

      // $http.post('http://localhost:8080/login', {
      //   "email": vm.username,
      //   "password": vm.password
      // }).success(function (data) {
      //   console.debug(data);
      //   $rootScope.loggedIn = data;
      // }).error(function (data) {
      //   console.log('error: ' + data);
      // });



    }

  }
})();
