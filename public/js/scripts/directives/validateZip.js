angular.module('draymasterApp')
    .directive('validateZip', function () {
        var ZIP_REGEX = new RegExp('^\\d{5}$'); // RegExp for US Zip Codes
        var CZIP_REGEX = new RegExp('^[ABCEGHJKLMNPRSTVXY]\\d[A-Z] ?\\d[A-Z]\\d$', 'i'); // RegExp for Canada Zip Codes
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
              function validate(value) {
				
                if (ZIP_REGEX.test(value) || CZIP_REGEX.test(value)) {
                    ctrl.$setValidity('validateZip', true);
                    return value;
                } else {
                    ctrl.$setValidity('validateZip', false);
                    return undefined;
                }
              }
              ctrl.$parsers.unshift(validate);
              ctrl.$formatters.unshift(validate);
            }
        };
    });