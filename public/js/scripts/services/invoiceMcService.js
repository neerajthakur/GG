angular.module('draymasterApp')
.factory('invoiceMcService', function($http){
    var baseUrlAdmin = '/service/admin/invoicemc/';
	var baseUrlUser = '/service/invoicemc/';
	return {
		getInvoiceMcAdminAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getInvoiceMcPaidAdminAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAllProcessed?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
        getInvoiceMcAll: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getInvoiceDetail: function(invoicemcId){
			return $http.get(baseUrlUser + 'getInvoiceDetail/' + invoicemcId);
		}
		
    };
}); 