angular.module('draymasterApp')
.factory('reportTemplateService', function($http){
    
    var baseUrlAdmin = '/service/admin/reportTemplates/';
	var baseUrlUser = '/service/reportTemplates/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getMcTemplates: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getReportTemplate: function(reportTemplateId){
			return $http.get(baseUrlAdmin + 'getReportTemplate/' + reportTemplateId);
		}
    };
}); 