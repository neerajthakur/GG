angular.module('draymasterApp')
.factory('contactService', function($http){
    
    var baseUrlAdmin = '/service/admin/contacts/';
	var baseUrlUser = '/service/contacts/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getContact: function(contactId){
			return $http.get(baseUrlAdmin + 'getContact/' + contactId);
		},
		getUserContacts: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getUserContact: function(contactId){
			return $http.get(baseUrlUser + 'getContact/' + contactId);
		}
    };
}); 