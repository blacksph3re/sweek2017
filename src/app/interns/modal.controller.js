(function() {
  'use strict';

  angular
    .module('sweek2017')
    .controller('ModalController', ModalController);

  /** @ngInject */
  function ModalController($uibModalInstance, $rootScope) {

    var vm = this;
    vm.item = $rootScope.selectedOpportunity;

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }
})();
