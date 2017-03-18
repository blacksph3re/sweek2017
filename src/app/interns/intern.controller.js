(function () {
  'use strict';

  angular
    .module('sweek2017')
    .controller('InternController', InternController);

  /** @ngInject */
  function InternController($scope) {


    var data = [{
      "name": "City"
    }, {
      "name": "Pay"
    }, {
      "name": "Field"
    }, {
      "name": "Requirements"
    }];

    function chunk(arr, size) {
      var newArr = [];
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }
      return newArr;
    }

    $scope.rows = chunk(data, 3);


    var vm = this;
    var sample_data;

    vm.inputChange = inputChange;
    vm.filter = "";

    activate();

    function activate() {
      $.getJSON('data.json', function (json) {
        sample_data = json;
        console.debug(sample_data);
        vm.inputChange();
      });
    }

    function inputChange() {

      // instantiate d3plus
      var visualization = d3plus.viz()
        .container(".bubbles")     // container DIV to hold the visualization
        .data(sample_data)     // data to use with the visualization
        .type("bubbles")       // visualization type
        .id(["name", "city", "subfield", "title"]) // nesting keys
        .depth(1)              // 0-based depth
        //.size("value")         // key name to size bubbles
        .color("name")        // color by each group
        .draw();             // finally, draw the visualization!

      // visualization.on('click', function () {
      //   console.debug('click');
      // });
    }

  }
})();
