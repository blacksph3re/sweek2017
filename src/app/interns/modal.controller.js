(function() {
  'use strict';

  angular
    .module('sweek2017')
    .controller('ModalController', ModalController);

  /** @ngInject */
  function ModalController($uibModalInstance) {
  

    var vm = this;

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }
})();
