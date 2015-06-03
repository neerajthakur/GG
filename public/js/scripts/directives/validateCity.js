angular.module('draymasterApp')
.directive('validateCity', ['cityService', '$timeout', function(cityService, $timeout) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ctrl) {
       
        var cities = [];
        var timer;
        cityService.all().success(function(data){
          for(var i=0; i < data.length; i++) {
            cities.push(data[i].city);
          }
        });
        
        function validate() {
          if(timer) {
            $timeout.cancel(timer);
          }

          if(attrs.validateCity === 'allow_blanks') {
            if(element.val() === '') {
              ctrl.$setValidity('cityValidate', true);
              return;
            }
          }

          timer = $timeout(function(){
            var match = '';
            match = cities.filter(function(item){ return item === element.val(); });
            if(match.length > 0) {
              ctrl.$setValidity('cityValidate', true);
              scope.$apply();
            } else {
              ctrl.$setValidity('cityValidate', false);
              scope.$apply();
            }
          }, 300);
        }
        
        element.bind('keyup', function() {
          validate();
        });
        
        scope.$on('typeaheadSelected', function() {
          validate();
        });
      }
    };
}]);