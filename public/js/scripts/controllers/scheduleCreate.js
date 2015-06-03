angular.module('draymasterApp')
.controller('ScheduleCreateCtrl', ['$scope', '$location',  'storeService',
function($scope, $location, storeService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.storeData = [];
	
	
    var id = '0';
	$scope.ng_store_id = '0';
	$scope.ng_address = '';
	$scope.ng_door_number = '';
	$scope.ng_door_city = '';
	$scope.ng_door_region = '';
	$scope.client_option = '';
	$scope.client_options = [{id: '', name: '--Select--'  }];
	$scope.client_id_post = "";
		
	//----- SERVICES -----
	$scope.init = function(id, client_id){
		
		if(id == ""){
			$scope.ng_store_id = '0';
		}else{
			$scope.ng_store_id = id;
		}
		if(client_id == ""){
			$scope.client_id_post = '';
		}else{
			$scope.client_id_post = client_id;
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
		storeService.getStoreClients($scope.ng_store_id).success(function(response) {
			//console.log(response);
			$scope.client_options = response;
			$scope.client_option = $scope.client_id_post;
			console.log($scope.client_option);
			//$scope.storeData = response;
			
			//$scope.tempLoadingModal = false;
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