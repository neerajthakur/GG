angular.module('draymasterApp')
.directive('milesSlider', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      return $timeout(function() {

          element.slider({ 
            min:20, 
            max: 800, 
            value: 250, 
            range: "min",
            step: 5,
            slide: function(event, ui) {
              scope.$apply(function(){
                scope.terminalGroups[attrs.milesSlider].milesServed = ui.value;
              });
            }
          });
        
      });
    }
  };
}]);