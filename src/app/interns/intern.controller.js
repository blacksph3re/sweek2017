(function () {
  "use strict";

  angular
    .module("sweek2017")
    .controller("InternController", InternController);

  /** @ngInject */
  function InternController($uibModal) {

    var vm = this;
    var originalData, currentData;

    var groupsOrder = ["city", "name", "subfiled", "title"];
    var currentGroup = 0;
    var visualization = null;

    vm.inputChange = inputChange;
    vm.resetInput = resetInput;
    vm.filter = "";

    vm.rows = [];

    activate();

    function activate() {
      $.getJSON("data.json", function (json) {
        originalData = json;
        currentData = originalData;
        vm.inputChange();

        vm.rows = chunk(originalData, ["city", "name", "subfiled"]);
      });
    }

    function inputChange() {

      drawChart(currentData, ["city", "name"]);
    }

    function resetInput() {

      currentData = originalData;
      currentGroup = 0;
      inputChange();
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

      currentData = currentData.filter(function (elem) {
        return elem[groupIndex] == groupValue;
      });

      drawChart(currentData, [groupsOrder[currentGroup], groupsOrder[currentGroup + 1]]);

    }

    function chunk(data, fields) {

      var newArr = {};

      for (var index = 0; index < fields.length; index++) {
        for (var i = 0; i < data.length; i++) {

          if (newArr[fields[index]] === undefined) {
            newArr[fields[index]] = [];
          }

          if (newArr[fields[index]].indexOf(data[i][fields[index]]) < 0) {
            newArr[fields[index]].push(data[i][fields[index]]);
          }
        }
      }

      return newArr;
    }


    vm.open = function () {

      $uibModal.open({
        animation: false,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/interns/modal.html',
        controller: 'ModalController',
        controllerAs: '$ctrl',
        size: 'lg',
        show: false
      });
    };
  }
})();
