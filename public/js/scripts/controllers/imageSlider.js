angular.module('draymasterApp')
	.controller('SliderController', ['$scope', 'imageSliderService', 
	function($scope, imageSliderService) {
	  $scope.images = [];

	  $scope.init = function(){
		$scope.tempLoadingModal = true;
		imageSliderService.getClientReportImages().success(function(response) {
            //$scope.dataLoaded = true;
			//console.log(response);
			$scope.images = response;
            
			//$scope.tempLoadingModal = false;
        });
	};

}]);