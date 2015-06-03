angular.module('draymasterApp')
.directive('validateCurrency', function() {
  var currency_REGEX = new RegExp('\^\\d\+\(\.\\d\{2\}\)\?\$');
  return {
    require: '?ngModel',
    link: function(scope,element,attrs,ngModel) {
      
      var init = false;
      
      function validate() {
        if(currency_REGEX.test(ngModel.$viewValue)) {
          ngModel.$setValidity('validateCurrency', true);
        } else {
          ngModel.$setValidity('validateCurrency', false);
        }
        if(attrs.showParentError === 'true') {
          (ngModel.$invalid)? element.parent().addClass('has-error') : element.parent().removeClass('has-error');
        }
        if(!scope.$$phase){scope.$apply();};
      }
      
      element.bind('keyup',function() {
        validate();
      });
      
      attrs.$observe('active', function(val) {
        if(val === 'false') {
          if(!scope.$$phase) {
            scope.$apply(function() {
              ngModel.$setValidity('validateCurrency', true);
              element.parent().removeClass('has-error');
            });
          } else {
            ngModel.$setValidity('validateCurrency', true);
            element.parent().removeClass('has-error');
          }
        } else if(val === 'true') {
          if(init === true) {
            validate();
          } else {
            init = true;
          }
        }
      });
      
    }
  };
});