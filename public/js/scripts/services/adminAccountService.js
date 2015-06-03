angular.module('draymasterApp')
.factory('adminAccountService', ['$http', function($http) {
    
      var baseUrl = '/service/admin/account/';
      
      return {
        allAccounts: function(column, order, searchParam) {
          return $http.get(baseUrl + 'all' +'/'+column+'/'+order+ '?search=' + searchParam);
        },
		sortAccounts: function(column, order, searchParam){
			if(column !== null){
				return $http.get(baseUrl + 'all' +'/'+column+'/'+order+'?search='+searchParam);
			}
		},
		accountDetail: function(accountHash){
			if(accountHash !== null){
				return $http.get(baseUrl + 'detail' +'/'+accountHash);
			}
		},
		usersListing: function(accountHash) {
          return $http.get(baseUrl + 'users' + '/' + accountHash);
        },
		changeStatus: function(accountHash){
			return $http.get('/admin/account/changeStatus/' + accountHash + '/ajax');
		}
		
     };
            
}]);