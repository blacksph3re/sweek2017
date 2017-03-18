(function() {
  'use strict';

  angular
    .module('sweek2017')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
