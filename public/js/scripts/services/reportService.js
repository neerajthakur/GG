angular.module('draymasterApp')
.factory('reportService', function($http){
    
    var baseUrlAdmin = '/service/admin/reports/';
	var baseUrlUser = '/service/reports/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getAllApproved: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAllApproved?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getReport: function(reportId){
			return $http.get(baseUrlUser + 'getReport/' + reportId);
		}
    };
}); 