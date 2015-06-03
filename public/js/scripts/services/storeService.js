angular.module('draymasterApp')
.factory('storeService', function($http){
    
    var baseUrlAdmin = '/service/admin/stores/';
	var baseUrlUser = '/service/stores/';
	return {
        getAll: function(page,orderBy,order,searchParam,client_id) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order + '&search=' + searchParam + '&client_id=' + client_id);
        },
		getStore: function(hash){
			return $http.get(baseUrlAdmin + 'getStore/' + hash);
		},
		getStoreById: function(storeId){
			return $http.get(baseUrlAdmin + 'getStoreById/' + storeId);
		},
		getUserStores: function(page,orderBy,order,searchParam) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order + '&search=' + searchParam);
        },
		getUserStore: function(hash){
			return $http.get(baseUrlUser + 'getStore/' + hash);
		},
		getStoreClients: function(storeId){
			return $http.get(baseUrlAdmin + 'getStoreClients/' + storeId);
		}
    };
}); 