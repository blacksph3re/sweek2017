(function () {
  "use strict";

  angular
    .module("sweek2017")
    .controller("InternController", InternController);

  /** @ngInject */
  function InternController($uibModal, $rootScope) {

    var vm = this;
    var originalData, currentData;

    var groupsOrder = ["city", "name", "subfiled", "title"];
    var currentGroup = 0;
    var visualization = null;
    var defaultSort = ["city", "name"];
    var sort = defaultSort;

    vm.inputChange = inputChange;
    vm.resetInput = resetInput;
    vm.sortFields = ["city", "name", "subfiled", "title"];
    vm.sort = sortInput;
    vm.open = openModal;

    activate();

    function activate() {
      $.getJSON("data.json", function (json) {
        originalData = json;
        currentData = originalData;
        vm.inputChange();
      });
    }

    function inputChange() {

      drawChart(currentData, sort);
      checkSort();
    }

    function checkSort() {

      $('.sort-field').removeClass('active');

      for (var i = 0; i < sort.length; i++) {
        $('.sort-' + sort[i]).addClass('active');
      }

      var oldOrder = groupsOrder.slice(0);
      groupsOrder = sort.slice(0);
      currentGroup = 0;

      for (var i in oldOrder) {
        if (groupsOrder.indexOf(oldOrder[i]) < 0) {
          groupsOrder.push(oldOrder[i]);
        }
      }
    }

    function resetInput() {

      currentData = originalData;
      currentGroup = 0;
      sort = defaultSort;
      inputChange();
    }

    function drawChart(data, sortFields) {

      if (visualization) {

        visualization.data(data).id(sortFields).draw();

      } else {

        visualization = d3plus.viz()
          .container(".bubbles")      // container DIV to hold the visualization
          .data(data)                 // data to use with the visualization
          .type("bubbles")            // visualization type
          .id(sortFields)             // nesting keys
          .depth(1)                   // 0-based depth
          //.size("value")            // key name to size bubbles
          .color(sortFields[0])       // color by each group
          .mouse({
            "move": false,            // key will also take custom function
            "click": chartClick
          })
          .draw();                    // finally, draw the visualization!
      }
    }

    function sortInput(field) {

      if (sort.length == 2) {
        sort = [field];
      } else {
        sort.push(field);
        inputChange();
      }

      checkSort();
    }

    function chartClick(elem) {

      var groupIndex = groupsOrder[currentGroup];
      var groupValue = elem[groupIndex];
      currentGroup = groupsOrder.indexOf(groupIndex) + 1;

      currentData = currentData.filter(function (elem) {
        return elem[groupIndex] == groupValue;
      });

      if (currentGroup == groupsOrder.length - 1) {
        currentGroup -= 1;
        openModal(elem);
      } else {
        drawChart(currentData, [groupsOrder[currentGroup], groupsOrder[currentGroup + 1]]);
      }

    }

    function openModal(elem) {

      $rootScope.selectedOpportunity = elem;

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
    }
  }
})();
