angular.module('draymasterApp')
.directive('missingRatesDataTable', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    scope: {
      tariff: '='
    },
    templateUrl: '/js/template/custom/missingRates.html',
    controller: function($scope) {
      this.provideRates = function(){
        return $scope.tariff.missingRates;
      };
    },
    link: function () {
      return $timeout(function() {
        
        $('#missingRatesTableSlot [data-provide="datatable"]').each (function () {	
				$(this).addClass ('dataTable-helper');		
				var defaultOptions = {
						paginate: false,
						search: false,
						info: false,
						lengthChange: false,
						displayRows: 10
					},
					dataOptions = $(this).data (),
					helperOptions = $.extend (defaultOptions, dataOptions),
					$thisTable,
					tableConfig = {};

				tableConfig.iDisplayLength = helperOptions.displayRows;
				tableConfig.bFilter = true;
				tableConfig.bSort = true;
				tableConfig.bPaginate = false;
				tableConfig.bLengthChange = false;	
				tableConfig.bInfo = false;

				if (helperOptions.paginate) { tableConfig.bPaginate = true; }
				if (helperOptions.lengthChange) { tableConfig.bLengthChange = true; }
				if (helperOptions.info) { tableConfig.bInfo = true; }       
				if (helperOptions.search) { $(this).parent ().removeClass ('datatable-hidesearch'); }				

				tableConfig.aaSorting = [];
				tableConfig.aoColumns = [];

				$(this).find ('thead tr th').each (function (index, value) {
					var sortable = ($(this).data ('sortable') === true) ? true : false;
					tableConfig.aoColumns.push ({ 'bSortable': sortable });

					if ($(this).data ('direction')) {
						tableConfig.aaSorting.push ([index, $(this).data ('direction')]);
					}
				});		
				
				// Create the datatable
				$thisTable = $(this).dataTable (tableConfig);

				if (!helperOptions.search) {
					$thisTable.parent ().find ('.dataTables_filter').remove ();
				}

				var filterableCols = $thisTable.find ('thead th').filter ('[data-filterable="true"]');

				if (filterableCols.length > 0) {
					var columns = $thisTable.fnSettings().aoColumns,
						$row, th, $col, showFilter;

					$row = $('<tr>', { cls: 'dataTable-filter-row' }).appendTo ($thisTable.find ('thead'));

					for (var i=0; i<columns.length; i++) {
						$col = $(columns[i].nTh.outerHTML);
						showFilter = ($col.data ('filterable') === true) ? 'show' : 'hide';

						th = '<th class="' + $col.prop ('class') + '">';
						th += '<input type="text" class="form-control input-sm ' + showFilter + '" placeholder="' + $col.text () + '">';
						th += '</th>';
						$row.append (th);
					}

					$row.find ('th').removeClass ('sorting sorting_disabled sorting_asc sorting_desc sorting_asc_disabled sorting_desc_disabled');

					$thisTable.find ('thead input').keyup( function () {
						$thisTable.fnFilter( this.value, $thisTable.oApi._fnVisibleToColumnIndex( 
							$thisTable.fnSettings(), $thisTable.find ('thead input[type=text]').index(this) ) );
					});

					$thisTable.addClass ('datatable-columnfilter');
				}
			});

			$('.dataTables_filter input').prop ('placeholder', 'Search...');
      });
    }
  };
}]);