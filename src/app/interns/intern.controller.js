(function () {
  "use strict";

  angular
    .module("sweek2017")
    .controller("InternController", InternController);

  /** @ngInject */
  function InternController($scope) {

    var groupsOrder = ["city", "name", "subfiled", "title"];
    var currentGroup = 0;
    var visualization = null;

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
      $.getJSON("data.json", function (json) {
        sample_data = json;
        vm.inputChange();
      });
    }

    function inputChange() {

      drawChart(sample_data, ["city", "name"]);
    }

    function drawChart(data, filters) {

      if (visualization) {

        visualization.data(data).id(filters).draw();

      } else {

        visualization = d3plus.viz()
          .container(".bubbles")     // container DIV to hold the visualization
          .data(data)        // data to use with the visualization
          .type("bubbles")          // visualization type
          .id(filters)              // nesting keys
          .depth(1)                 // 0-based depth
          //.size("value")          // key name to size bubbles
          .color(filters[0])          // color by each group
          .mouse({
            "move": false,                        // key will also take custom function
            "click": chartClick
          })
          .draw();                  // finally, draw the visualization!
      }
    }

    function chartClick(elem) {

      var groupIndex = groupsOrder[currentGroup];
      var groupValue = elem[groupIndex];
      currentGroup = groupsOrder.indexOf(groupIndex) + 1;

      drawChart(sample_data.filter(function (elem) {
        return elem[groupIndex] == groupValue;
      }), [groupsOrder[currentGroup], groupsOrder[currentGroup + 1]]);

    }

  }
})();
