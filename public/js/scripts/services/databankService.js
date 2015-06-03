angular.module('draymasterApp')
.factory('databankService', function($http){
    var baseUrlAdmin = '/service/databank/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getDatabank: function(databankId){
			return $http.get(baseUrlAdmin + 'getDatabank/' + databankId);
		}
    };
}); 