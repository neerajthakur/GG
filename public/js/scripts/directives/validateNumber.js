angular.module('draymasterApp')
    .directive('validateNumber', function () {
        var NUMBER_REGEX = new RegExp('^[\-]?[0-9]*[.]?[0-9]+$'); 
        
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
              function validate(value) {
				 
                if (NUMBER_REGEX.test(value)) {
					
                    ctrl.$setValidity('validateNumber', true);
                    return value;
					
                } else {
					
                    ctrl.$setValidity('validateNumber', false);
                    return undefined;
                }
              }
              ctrl.$parsers.unshift(validate);
              ctrl.$formatters.unshift(validate);
            }
        };
    });