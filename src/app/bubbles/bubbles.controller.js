(function () {
  'use strict';

  angular
    .module('sweek2017')
    .controller('BubblesController', BubblesController);

  /** @ngInject */
  function BubblesController() {
    var vm = this;

    vm.inputChange = inputChange;
    vm.filter = "";

    activate();

    function activate() {
      vm.inputChange();
    }

    function inputChange() {

      // sample data array
      var sample_data = [
        {"value": 5, "name": "alpha", "group": "option 1"},
        {"value": 7, "name": "epsilon", "group": "option 1"},
        {"value": 6, "name": "zeta", "group": "option 1"},
        {"value": 7, "name": "beta", "group": "option 2"},
        {"value": 4, "name": "gamma", "group": "option 2"},
        {"value": 6, "name": "delta", "group": "option 2"},
        {"value": 5, "name": "zeta1", "group": "option 3"},
        {"value": 8, "name": "zeta2", "group": "option 3"},
        {"value": 5, "name": "zeta3", "group": "option 3"},
      ];
      // instantiate d3plus
      var visualization = d3plus.viz()
        .container(".bubbles")     // container DIV to hold the visualization
        .data(sample_data)     // data to use with the visualization
        .type("bubbles")       // visualization type
        .id(["group", "name"]) // nesting keys
        .depth(1)              // 0-based depth
        .size("value")         // key name to size bubbles
        .color("group")        // color by each group
        .draw();             // finally, draw the visualization!

      // visualization.on('click', function () {
      //   console.debug('click');
      // });
    }

  }
})();
