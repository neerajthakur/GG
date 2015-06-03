angular.module('draymasterApp')
.factory('supervisorService', function($http){
    
    var baseUrlAdmin = '/service/admin/supervisors/';
	var baseUrlUser = '/service/supervisors/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getSupervisor: function(supervisorId){
			return $http.get(baseUrlAdmin + 'getSupervisor/' + supervisorId);
		},
		getUserSupervisors: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getUserSupervisor: function(supervisorId){
			return $http.get(baseUrlUser + 'getSupervisor/' + supervisorId);
		}
    };
}); 