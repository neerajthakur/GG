angular.module('draymasterApp')
.factory('scheduleService', function($http){
    var baseUrlAdmin = '/service/admin/schedules/';
	var baseUrlUser = '/service/schedules/';
	return {
        getAll: function(page,orderBy,order,searchParam) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order+ '&search=' + searchParam);
        },
		getSchedule: function(scheduleId){
			return $http.get(baseUrlAdmin + 'getSchedule/' + scheduleId);
		},
		getScheduleMc: function(scheduleId){
			return $http.get(baseUrlUser + 'getSchedule/' + scheduleId);
		},
		getUserSchedules: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getUserSchedule: function(scheduleId){
			return $http.get(baseUrlUser + 'getSchedule/' + scheduleId);
		}
    };
}); 