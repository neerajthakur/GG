angular.module("draymasterApp")
.directive("datepicker", function() {
  return {
    link: function(scope, element, attrs) {
      element.datepicker();
    }
  };
});