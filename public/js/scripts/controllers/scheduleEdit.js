angular.module('draymasterApp')
.controller('ScheduleEditCtrl', ['$scope', '$location',  'storeService', 'scheduleService',
function($scope, $location, storeService, scheduleService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.storeData = [];
	
	
    var id = '0';
	$scope.ng_store_id = '0';
	$scope.ng_address = '';
	$scope.ng_door_number = '';
	$scope.ng_door_city = '';
	$scope.ng_door_region = '';
		
	//----- SERVICES -----
	$scope.init = function(id){
		if(typeof id == "undefined"){
			$scope.ng_store_id = '0';
		}else{
			$scope.ng_store_id = id;
		}
		$scope.getStoreInfo();
	}

	$scope.getStoreInfo = function(){
		$scope.tempLoadingModal = true;
		storeService.getStoreById($scope.ng_store_id).success(function(response) {
			$scope.storeData = response;
			$scope.ng_address = response.address;
			$scope.ng_door_number = response.door_number;
			$scope.ng_door_city = response.door_city;
			$scope.ng_door_region = response.door_region;
            $scope.tempLoadingModal = false;
        });
	};

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};


}]);