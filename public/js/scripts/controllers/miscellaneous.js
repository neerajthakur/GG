angular.module('draymasterApp')
.controller('MiscellaneousCtrl', ['$scope', '$location',
function($scope, $location) {

	

	
    
    
	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteRecord = function(name, id) {
		$scope.deletedRecordName = name;
		$scope.deletedRecordId = id;
		$scope.openModal("confirmDelete");
    };	
}]);