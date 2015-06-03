angular.module('draymasterApp')
.controller('StoreListingCtrl', ['$scope', '$location',  'storeService',
function($scope, $location, storeService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	$scope.urlQueryString = $location.$$absUrl.split("?");
	$scope.searchParam = "";
	$scope.clientIdParam = "";
	if($scope.urlQueryString.length > 1){
		var queryString = $scope.urlQueryString[1].split("&");
		
		if(typeof queryString != 'undefined'){
			for(var i = 0; i < queryString.length; i++){
				var queryParam = queryString[i].split("=");
				if(typeof queryParam != "undefined"){
					for(var j = 0; j < queryParam.length; j++){
						if(queryParam[j] == 'search'){
							$scope.searchParam = queryParam[j + 1];
							//break;
						}
						if(queryParam[j] == 'client_id_single'){
							$scope.clientIdParam = queryParam[j + 1];
						}
					}
				}
			}
		}
		

		/*var searchVal = $scope.urlQueryString[1].split("=");
		if(typeof $scope.urlQueryString[1] != 'undefined'){
			console.log(searchVal);
			for(var i = 0; i < searchVal.length; i++){
				if(searchVal[i] == 'search'){
					$scope.searchParam = searchVal[i + 1];
					break;
				}
			}
		}*/
	}
	//$scope.storeData = [];
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'corporation',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.storesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		storeService.getAll($scope.main.page,$scope.main.orderBy, $scope.main.order,$scope.searchParam, $scope.clientIdParam).success(function(response) {
            $scope.dataLoaded = true;
			$scope.storesList = response.data;
            $scope.allStores = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortStoreListing = function(column) {
		var sort = $scope.sort;
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
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteStore = function(name, id) {
		$scope.deletedStoreName = name;
		$scope.deletedStoreId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.viewStore = function(name, id) {
		$scope.tempLoadingModal = true;
		storeService.getStore(id).success(function(response) {
			$scope.storeData = response.store;
			$scope.storeData.clients = response.clients;
			$scope.viewStoreName = name;
			$scope.viewStoreId = id;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewStore");
		});
		
    };

	
}]);