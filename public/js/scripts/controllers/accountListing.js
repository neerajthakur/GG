angular.module('draymasterApp')
.controller('AccountListingCtrl', ['$scope', '$location', 'adminAccountService',
function($scope, $location, adminAccountService) {
    
    //----- VARIABLES -----
    $scope.urlQueryString = $location.$$absUrl.split("?");
	$scope.searchParam = "";
	if($scope.urlQueryString.length > 1){
		var searchVal = $scope.urlQueryString[1].split("=");
		if(typeof $scope.urlQueryString[1] != 'undefined'){
			for(var i = 0; i < searchVal.length; i++){
				if(searchVal[i] == 'search'){
					$scope.searchParam = searchVal[i + 1];
					break;
				}
			}
		}
		
	}
    $scope.accounts = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: 'user.id',
            descending: true
        }; 
    
    //----- SERVICES -----
	var col = $scope.sort.column;
	var ord = 'desc';
    
    adminAccountService.allAccounts(col,ord, $scope.searchParam).success(function(data) {
		column = 'usertype.id';
		var sort = $scope.sort;
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.accounts = data;
		$scope.dataLoaded = true;
    });
	$scope.sortAccountListing = function(column) {
		var sort = $scope.sort;
		$scope.tempLoadingModal = true;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		
		adminAccountService.sortAccounts(sort.column,order,$scope.searchParam).success(function(data) {
			$scope.accounts = data;
			$scope.dataLoaded = true;
			$scope.tempLoadingModal = false;
		});
    };
	$scope.changeStatus = function(e){
		var hash = $(e.target).data('hash');
		console.log(hash);
		adminAccountService.changeStatus(hash).success(function(data){
			if($(e.target).html() == 'Active'){
				$(e.target).html('Inactive');
			}else{
				$(e.target).html('Active');
			}
		});
	};

	$scope.viewAccountDetail = function(accountHash) {
		window.location.href = '/admin/account/detail/'+accountHash;
	};
}]);