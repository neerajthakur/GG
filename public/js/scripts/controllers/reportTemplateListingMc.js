angular.module('draymasterApp')
.controller('ReportTemplateListingMCCtrl', ['$scope', '$location',  'reportTemplateService',
function($scope, $location, reportTemplateService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.reportTemplateData = [];
	
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
                orderBy: 'templateName',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.reportTemplatesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		reportTemplateService.getMcTemplates($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.reportTemplatesList = response.data;
            $scope.allReportTemplates = response;
			
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

	$scope.sortReportTemplateListing = function(column) {
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

	$scope.deleteReportTemplate = function(name, id) {
		$scope.deletedReportTemplateName = name;
		$scope.deletedReportTemplateId = id;
		$scope.openModal("confirmDelete");
    };	
}]);