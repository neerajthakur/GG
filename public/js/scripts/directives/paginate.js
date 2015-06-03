angular.module('draymasterApp')
.directive('paginate', ['adminTerminalService', function (adminTerminalService) {
	
    return {
        scope: {
            allTerminals: '=paginate'
        },
        template: '<ul class="pagination" ng-show="totalPages > 1">' +
            '  <li><a ng-click="firstPage()">&laquo;</a></li>' +
            '  <li><a ng-click="prevPage()">&lsaquo;</a></li>' +
            '  <li ng-repeat="n in pages">' +
            '    <a class="current-{{n==current_page}}" ng-bind="n" ng-click="setPage(n,orderBy,order)">1</a>' +
            '  </li>' +
            '  <li><a ng-click="nextPage()">&rsaquo;</a></li>' +
            '  <li><a ng-click="last_page()">&raquo;</a></li>' +
            '</ul>',
        link: function (scope) {
			var orderBy = 'city';
			var order = 'asc';
            scope.nextPage = function () {
                if (scope.current_page < scope.totalPages) {
                    scope.current_page++;
                }
            };

            scope.prevPage = function () {
                if (scope.current_page > 1) {
                    scope.current_page--;
                }
            };

            scope.firstPage = function () {

                scope.current_page = 1;
            };

            scope.last_page = function () {
                scope.current_page = scope.totalPages;
            };

            scope.setPage = function (page,orderBy,order) {
                scope.current_page = page;
				orderBy = orderBy;
				order = order;
			};
            var paginate = function (results, oldResults) {
				if (oldResults === results) return;
				scope.current_page = results.current_page;
                scope.total = results.total;
                scope.totalPages = results.last_page;
                scope.pages = [];
                /*var startPage = scope.current_page - 4;
				var endPage = scope.current_page + 4;
				if(startPage <= 0){
					endPage -= (startPage - 1);
					startPage = 1;
				}
				if(endPage > scope.totalPages){
					endPage = scope.toalPages;
				}

				for(var i = startPage; i <= endPage; i++){
					scope.pages.push(i);
				}*/

                for (var i = 1; i <= scope.totalPages; i++) {
                    scope.pages.push(i);
                }
				scope.orderBy = orderBy;
				scope.order = order;
            };

            var pageChange = function (newPage, last_page, scope) {
				if (newPage == last_page) return;
				
                adminTerminalService.get({
                    page: newPage,
					orderBy: orderBy,
					order: order
                }, function (response) {
                    angular.copy(response.data, scope.allTerminals.data);
                    scope.allTerminals.current_page = response.current_page;
                }, function (error) {
                    console.log(error);
                    $scope.allTerminals.data = [];
                });

            };

            scope.$watch('allTerminals', paginate);
            scope.$watch('current_page', pageChange);
        }
    };    
}]);