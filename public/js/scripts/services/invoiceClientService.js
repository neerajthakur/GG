angular.module('draymasterApp')
.factory('invoiceClientService', function($http){
    var baseUrlAdmin = '/service/admin/invoiceClient/';
	var baseUrlUser = '/service/invoiceClient/';
	return {
		getClientById: function(client_id) {
			return $http.get(baseUrlAdmin + 'getClientById?client_id=' + client_id );
        },
		getClientReports: function(client_id, from_date, to_date) {
			return $http.get(baseUrlAdmin + 'getClientReportsById?client_id=' + client_id + '&from_date=' + from_date + '&to_date=' + to_date );
        },
		getInvoiceClientAll: function(page,orderBy,order){
			return $http.get(baseUrlAdmin + 'getClientInvoicesAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
		}
		
    };
}); 