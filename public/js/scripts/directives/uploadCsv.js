angular.module('draymasterApp')
.directive('uploadCsv', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			var model = $parse(attrs.uploadCsv);
			var modelSetter = model.assign;

			element.bind('change', function (event) {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
					var CSV_REGEX = new RegExp('^\\w\+\.csv$');
					if(CSV_REGEX.test(element[0].files[0].name)) {
						scope.uploadErrors = '';
						scope.invalidFile = false;
					} else {
						scope.uploadErrors = 'Invalid file format. Please upload a CSV file with no spaces or dashes in the name.';
						scope.invalidFile = true;
					}
				});

			});

		}
	};
}]);