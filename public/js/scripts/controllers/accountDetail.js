angular.module('draymasterApp')
.controller('AccountDetailCtrl', ['$scope', '$location', 'adminAccountService',
function($scope, $location, adminAccountService) {
    
    //----- VARIABLES -----
    $scope.dataLoaded = false;
	$scope.userDataLoaded = false;
	$scope.status = false;
    $scope.accountDetail = [];
	$scope.usersListing = [];
	$scope.accountHash = $location.$$absUrl.substring($location.$$absUrl.lastIndexOf('/') + 1);
     
    
    //----- SERVICES -----
    
    

	adminAccountService.accountDetail($scope.accountHash).success(function(data) {
		$scope.accountDetail = data;
		if($scope.accountDetail.status == "active"){
			$scope.status = true;
		}
		$scope.dataLoaded = true;
    });
	/*adminAccountService.usersListing($scope.accountHash).success(function(data) {
		$scope.usersListing = data;
		$scope.userDataLoaded = true;
		
    });*/

	

}]);