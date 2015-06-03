angular.module('draymasterApp')
.factory('imageSliderService', function($http){
    
    var baseUrlAdmin = '/service/admin/reports/';
	var baseUrlUser = '/service/images/';
	return {
        getClientReportImages: function() {
			return $http.get(baseUrlUser + 'getReportImages');
        }
    };
}); 