angular.module('draymasterApp')
.controller('InvoiceClientCreateCtrl', ['$scope', '$location',  'invoiceClientService',
function($scope, $location, invoiceClientService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.storeData = [];
	$scope.reportsList = [];
	
	
    var id = '0';
	$scope.ng_billing_type = "hour";
	$scope.ng_client_id = '0';
	$scope.ng_currency = '';
	$scope.ng_address = '';
	$scope.ng_hourly_rate = 0;
	$scope.ng_visit_rate = 0;
	$scope.ng_vat = '';
	$scope.from_date = '';
	$scope.to_date = '';
	$scope.ng_total = 0;
	$scope.ng_vat = 0;
	$scope.ng_total_hours = 0;
	$scope.ng_total_visits = 0;

	$scope.ng_client_contact = '';
	$scope.ng_address_line1 = '';
	$scope.ng_address_line2 = '';
	$scope.ng_address_city = '';
	$scope.ng_address_zipcode = '';

		
	//----- SERVICES -----
	$scope.init = function(id){
		if(typeof id == "undefined"){
			$scope.ng_client_id = '0';
		}else{
			$scope.ng_client_id = id;
		}
		
		$scope.getClientReports();
		$scope.getClientInfo();
	}

	$scope.getClientInfo = function(){
		$scope.tempLoadingModal = true;
		invoiceClientService.getClientById($scope.ng_client_id).success(function(response) {
			$scope.clientData = response;
			$scope.ng_currency = response.symbol;
			$scope.ng_address = response.invoiceAddress;
			$scope.ng_hourly_rate = response.hourlyRate;
			$scope.ng_visit_rate = response.visitRate;
			$scope.ng_vat = response.vat;

			$scope.ng_client_contact = response.client_contact;
			$scope.ng_address_line1 = response.address_line1;
			$scope.ng_address_line2 = response.address_line2;
			$scope.ng_address_city = response.address_city;
			$scope.ng_address_zipcode = response.address_zipcode;
			$scope.ng_billing_type = "hour";
            $scope.tempLoadingModal = false;
        });
		$scope.getClientReports();
	};



	$scope.calculateAmount = function(){
		
		$scope.tempLoadingModal = true;
		if($scope.ng_billing_type == 'hour'){
			
			$scope.ng_total = parseFloat($scope.ng_hourly_rate) * parseFloat($scope.ng_total_hours);
		}else{
			$scope.ng_total = parseFloat($scope.ng_visit_rate) * parseFloat($scope.ng_total_visits);
		}
		$scope.ng_total = $scope.ng_total + (parseFloat($scope.ng_vat) * $scope.ng_total)/100;
		$scope.tempLoadingModal = false;
	}

	$scope.getClientReports = function(){
		$scope.tempLoadingModal = true;
		invoiceClientService.getClientReports($scope.ng_client_id, $scope.from_date, $scope.to_date).success(function(response) {
			$scope.reportsList = response;
			//console.log(response);
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