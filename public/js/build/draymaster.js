var App = function () {
	"use strict";

	var chartColors = ['#e5412d', '#f0ad4e', '#444', '#888','#555','#999','#bbb','#ccc','#eee'];
	
	return { init: init, chartColors: chartColors, debounce: debounce };

	function init () {
		initLayout ();	

		initICheck ();
		initSelect2 ();
		initTableCheckable ();
		
		initLightbox ();
		initEnhancedAccordion ();
		initDataTableHelper ();

		initFormValidation ();
		initTooltips ();
		initDatepicker ();
		initTimepicker ();
		initColorpicker ();
		initAutosize ();

		initBackToTop ();
	}

	function initLayout () {
		$('#site-logo').prependTo ('#wrapper');
		$('html').removeClass ('no-js');
		
		Nav.init ();	

		$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { 
		    e.stopPropagation(); 
		});
	}

	function initTableCheckable () {
		if ($.fn.tableCheckable) {
			$('.table-checkable')
		        .tableCheckable ()
			        .on ('masterChecked', function (event, master, slaves) { 
			            if ($.fn.iCheck) { $(slaves).iCheck ('update'); }
			        })
			        .on ('slaveChecked', function (event, master, slave) {
			            if ($.fn.iCheck) { $(master).iCheck ('update'); }
			        });
		}
	}

	function initAutosize () {
		if ($.fn.autosize) {
		$('.ui-textarea-autosize').each(function() {
			if($(this).data ('animate')) {
					$(this).addClass ('autosize-animate').autosize();
				} else {
					$(this).autosize();
				}
			});
		}
	}

	function initEnhancedAccordion () {
		$('.accordion .accordion-toggle').on('click', function (e) {			
	         $(e.target).parent ().parent ().parent ().addClass('open');
	    });
	
	    $('.accordion .accordion-toggle').on('click', function (e) {
	        $(this).parents ('.panel').siblings ().removeClass ('open');
	    });

	    $('.accordion').each (function () {	    	
	    	$(this).find ('.panel-collapse.in').parent ().addClass ('open');
	    });	    
	}

	function initFormValidation () {
		if ($.fn.parsley) {
			$('.parsley-form').each (function () {
				$(this).parsley ({
					trigger: 'change',
					errors: {
						container: function (element, isRadioOrCheckbox) {
							if (element.parents ('form').is ('.form-horizontal')) {
								return element.parents ("*[class^='col-']");
							}

							return element.parents ('.form-group');
						}
					}
				});
			});
		}
	}

	function initLightbox () {
		if ($.fn.magnificPopup) {
			$('.ui-lightbox').magnificPopup({
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: true,
				fixedContentPos: true,
				mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
				image: {
					verticalFit: true,
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
				}
			});

			$('.ui-lightbox-video, .ui-lightbox-iframe').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});

			$('.ui-lightbox-gallery').magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
					}
				}
			});
		}
	}

	function initSelect2 () {
		if ($.fn.select2) {
			$('.ui-select2').select2({ allowClear: true, placeholder: "Select..." });
		}
	}

	function initDatepicker () {
		if ($.fn.datepicker) { $('.ui-datepicker').datepicker ({ autoclose: true }); }
	}

	function initTimepicker () {
		if ($.fn.timepicker) { 
			var pickers = $('.ui-timepicker, .ui-timepicker-modal');

			pickers.each (function () {
				$(this).parent ('.input-group').addClass ('bootstrap-timepicker');

				if ($(this).is ('.ui-timepicker')) {
					$(this).timepicker ();
				} else {
					$(this).timepicker({ template: 'modal' });
				}	
			});		
		}
	}

	function initColorpicker () {
		if ($.fn.simplecolorpicker) {
			$('.ui-colorpicker').each (function (i) {
				var picker = $(this).data ('picker');

				$(this).simplecolorpicker({ 
					picker: picker
				});
			});
		}
	}

	function initTooltips () {
		if ($.fn.tooltip) { $('.ui-tooltip').tooltip (); }
		if ($.fn.popover) { $('.ui-popover').popover ({ container: 'body' }); }
	}

	function initICheck () {
		if ($.fn.iCheck) {
			$('.icheck-input').iCheck({
				checkboxClass: 'icheckbox_minimal-blue',
				radioClass: 'iradio_minimal-blue',
				inheritClass: true
			}).on ('ifChanged', function (e) {
				$(e.currentTarget).trigger ('change');
			});
		}
	}

	function initBackToTop () {
		var backToTop = $('<a>', { id: 'back-to-top', href: '#top' });
		var icon = $('<i>', { class: 'fa fa-chevron-up' });

		backToTop.appendTo ('body');
		icon.appendTo (backToTop);
		
	    backToTop.hide();

	    $(window).scroll(function () {
	        if ($(this).scrollTop() > 150) {
	            backToTop.fadeIn ();
	        } else {
	            backToTop.fadeOut ();
	        }
	    });

	    backToTop.click (function (e) {
	    	e.preventDefault ();

	        $('body, html').animate({
	            scrollTop: 0
	        }, 600);
	    });
	}

	function initDataTableHelper () {
		if ($.fn.dataTable) {
			$('[data-provide="datatable"]').each (function () {	
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
		}
	}

	function debounce (func, wait, immediate) {
		var timeout, args, context, timestamp, result;
		return function() {
			context = this;
			args = arguments;
			timestamp = new Date();

			var later = function() {
				var last = (new Date()) - timestamp;

				if (last < wait) {
					timeout = setTimeout(later, wait - last);
				} else {
					timeout = null;
					if (!immediate) result = func.apply(context, args);
				}
			};

			var callNow = immediate && !timeout;

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}

			if (callNow) result = func.apply(context, args);
			return result;
		};
	}
}();



var Nav = function () {
	
	return { init: init };
	
	function init () {
		var mainnav = $('#main-nav'),
			openActive = mainnav.is ('.open-active'),
			navActive = mainnav.find ('> .active');

		mainnav.find ('> .dropdown > a').bind ('click', navClick);
		
		if (openActive && navActive.is ('.dropdown')) {			
			navActive.addClass ('opened').find ('.sub-nav').show ();
		}
	}
	
	function navClick (e) {
		e.preventDefault ();
		
		var li = $(this).parents ('li');		
		
		if (li.is ('.opened')) { 
			closeAll ();			
		} else { 
			closeAll ();
			li.addClass ('opened').find ('.sub-nav').slideDown ();			
		}
	}
	
	function closeAll () {	
		$('.sub-nav').slideUp ().parents ('li').removeClass ('opened');
	}
}();


$(function () {
	App.init ();
});
var Login = function () {
	"use strict";
	
	return { init: init };

	function init () {
		$.support.placeholder = false;
		var test = document.createElement('input');
		if('placeholder' in test) $.support.placeholder = true;
		
		if (!$.support.placeholder) {
			$('#login-form').find ('label').show ();			
		}
	}
} ();

$(function () {

	Login.init ();
	
});
angular.module('ui.bootstrap', ['ui.bootstrap.dialog', 'ui.bootstrap.modal', 'ui.bootstrap.tabs', 'ui.bootstrap.tooltip','ui.bootstrap.typeahead']);
angular.module('draymaster.services', ['ngResource']);
angular.module('draymaster.sanitize', ['ngSanitize']);
angular.module('draymaster.route', ['ngRoute']);
angular.module('draymaster.fullscreen', ['FBAngular']);

var appModule = angular.module('draymasterApp',
  ['draymaster.services', 'draymaster.sanitize', 'draymaster.route', 'draymaster.fullscreen', 'ui', 'ui.bootstrap','ngAnimate']);

angular.module('draymasterApp')
.controller('AccountDetailCtrl', ['$scope', '$location', 'adminAccountService',
function($scope, $location, adminAccountService) {
    
    //----- VARIABLES -----
    $scope.dataLoaded = false;
	$scope.userDataLoaded = false;
	$scope.status = false;
    $scope.accountDetail = [];
	$scope.usersListing = [];
	$scope.accountHash = $location.$$absUrl.substring($location.$$absUrl.lastIndexOf('/') + 1);
     
    
    //----- SERVICES -----
    
    

	adminAccountService.accountDetail($scope.accountHash).success(function(data) {
		$scope.accountDetail = data;
		if($scope.accountDetail.status == "active"){
			$scope.status = true;
		}
		$scope.dataLoaded = true;
    });
	/*adminAccountService.usersListing($scope.accountHash).success(function(data) {
		$scope.usersListing = data;
		$scope.userDataLoaded = true;
		
    });*/

	

}]);
angular.module('draymasterApp')
.controller('AccountListingCtrl', ['$scope', '$location', 'adminAccountService',
function($scope, $location, adminAccountService) {
    
    //----- VARIABLES -----
    $scope.urlQueryString = $location.$$absUrl.split("?");
	$scope.searchParam = "";
	if($scope.urlQueryString.length > 1){
		var searchVal = $scope.urlQueryString[1].split("=");
		if(typeof $scope.urlQueryString[1] != 'undefined'){
			for(var i = 0; i < searchVal.length; i++){
				if(searchVal[i] == 'search'){
					$scope.searchParam = searchVal[i + 1];
					break;
				}
			}
		}
		
	}
    $scope.accounts = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: 'user.id',
            descending: true
        }; 
    
    //----- SERVICES -----
	var col = $scope.sort.column;
	var ord = 'desc';
    
    adminAccountService.allAccounts(col,ord, $scope.searchParam).success(function(data) {
		column = 'usertype.id';
		var sort = $scope.sort;
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.accounts = data;
		$scope.dataLoaded = true;
    });
	$scope.sortAccountListing = function(column) {
		var sort = $scope.sort;
		$scope.tempLoadingModal = true;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		
		adminAccountService.sortAccounts(sort.column,order,$scope.searchParam).success(function(data) {
			$scope.accounts = data;
			$scope.dataLoaded = true;
			$scope.tempLoadingModal = false;
		});
    };
	$scope.changeStatus = function(e){
		var hash = $(e.target).data('hash');
		console.log(hash);
		adminAccountService.changeStatus(hash).success(function(data){
			if($(e.target).html() == 'Active'){
				$(e.target).html('Inactive');
			}else{
				$(e.target).html('Active');
			}
		});
	};

	$scope.viewAccountDetail = function(accountHash) {
		window.location.href = '/admin/account/detail/'+accountHash;
	};
}]);
angular.module('draymasterApp')
.controller('ApprovedReportListingCtrl', ['$scope', '$location',  'reportService',
function($scope, $location, reportService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.reportsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		reportService.getAllApproved($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.reportsList = response.data.data;
            $scope.allReports = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortReportListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteReport = function(name, id) {
		$scope.deletedReportName = name;
		$scope.deletedReportId = id;
		$scope.openModal("confirmDelete");
    };	
}]);
angular.module('draymasterApp')
.controller('ContactListingCtrl', ['$scope', '$location',  'contactService',
function($scope, $location, contactService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'first_name',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.contactsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		contactService.getUserContacts($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.contactsList = response.data;
            $scope.allContacts = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortContactListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteContact = function(name, id) {
		$scope.deletedContactName = name;
		$scope.deletedContactId = id;
		$scope.openModal("confirmDelete");
    };
}]);
angular.module('draymasterApp')
.controller('DatabankListingCtrl', ['$scope', '$location',  'databankService',
function($scope, $location, databankService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'title',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.databankList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		databankService.getAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.databankList = response.data.data;
            $scope.allDatabanks = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortDatabankListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteDatabank = function(name, id) {
		$scope.deletedDatabankName = name;
		$scope.deletedDatabankId = id;
		$scope.openModal("confirmDelete");
    };	
}]);
angular.module('draymasterApp')
	.controller('SliderController', ['$scope', 'imageSliderService', 
	function($scope, imageSliderService) {
	  $scope.images = [];

	  $scope.init = function(){
		$scope.tempLoadingModal = true;
		imageSliderService.getClientReportImages().success(function(response) {
            //$scope.dataLoaded = true;
			//console.log(response);
			$scope.images = response;
            
			//$scope.tempLoadingModal = false;
        });
	};

}]);
angular.module('draymasterApp')
.controller('InvoiceClientCreateCtrl', ['$scope', '$location',  'invoiceClientService',
function($scope, $location, invoiceClientService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.storeData = [];
	$scope.reportsList = [];
	
	
    var id = '0';
	$scope.ng_billing_type = "hour";
	$scope.ng_client_id = '0';
	$scope.ng_currency = '';
	$scope.ng_address = '';
	$scope.ng_hourly_rate = 0;
	$scope.ng_visit_rate = 0;
	$scope.ng_vat = '';
	$scope.from_date = '';
	$scope.to_date = '';
	$scope.ng_total = 0;
	$scope.ng_vat = 0;
	$scope.ng_total_hours = 0;
	$scope.ng_total_visits = 0;

	$scope.ng_client_contact = '';
	$scope.ng_address_line1 = '';
	$scope.ng_address_line2 = '';
	$scope.ng_address_city = '';
	$scope.ng_address_zipcode = '';

		
	//----- SERVICES -----
	$scope.init = function(id){
		if(typeof id == "undefined"){
			$scope.ng_client_id = '0';
		}else{
			$scope.ng_client_id = id;
		}
		
		$scope.getClientReports();
		$scope.getClientInfo();
	}

	$scope.getClientInfo = function(){
		$scope.tempLoadingModal = true;
		invoiceClientService.getClientById($scope.ng_client_id).success(function(response) {
			$scope.clientData = response;
			$scope.ng_currency = response.symbol;
			$scope.ng_address = response.invoiceAddress;
			$scope.ng_hourly_rate = response.hourlyRate;
			$scope.ng_visit_rate = response.visitRate;
			$scope.ng_vat = response.vat;

			$scope.ng_client_contact = response.client_contact;
			$scope.ng_address_line1 = response.address_line1;
			$scope.ng_address_line2 = response.address_line2;
			$scope.ng_address_city = response.address_city;
			$scope.ng_address_zipcode = response.address_zipcode;
			$scope.ng_billing_type = "hour";
            $scope.tempLoadingModal = false;
        });
		$scope.getClientReports();
	};



	$scope.calculateAmount = function(){
		
		$scope.tempLoadingModal = true;
		if($scope.ng_billing_type == 'hour'){
			
			$scope.ng_total = parseFloat($scope.ng_hourly_rate) * parseFloat($scope.ng_total_hours);
		}else{
			$scope.ng_total = parseFloat($scope.ng_visit_rate) * parseFloat($scope.ng_total_visits);
		}
		$scope.ng_total = $scope.ng_total + (parseFloat($scope.ng_vat) * $scope.ng_total)/100;
		$scope.tempLoadingModal = false;
	}

	$scope.getClientReports = function(){
		$scope.tempLoadingModal = true;
		invoiceClientService.getClientReports($scope.ng_client_id, $scope.from_date, $scope.to_date).success(function(response) {
			$scope.reportsList = response;
			//console.log(response);
			$scope.tempLoadingModal = false;
		});
	};
	

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};


}]);
angular.module('draymasterApp')
.controller('InvoiceClientListingCtrl', ['$scope', '$location',  'invoiceClientService',
function($scope, $location, invoiceClientService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.invoicemcsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		invoiceClientService.getInvoiceClientAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.invoiceclientsList = response.data.data;
            $scope.allInvoices = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortInvoiceclientListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteInvoice = function(name, id) {
		$scope.invoiceclientName = name;
		$scope.invoiceclientId = id;
		$scope.openModal("confirmDelete");
    };
	$scope.approveInvoice = function(name, id) {
		$scope.invoiceclientName = name;
		$scope.invoiceclientId = id;
		$scope.openModal("approveInvoice");
    };
	$scope.cancelInvoice = function(name, id) {
		$scope.invoiceclientName = name;
		$scope.invoiceclientId = id;
		$scope.openModal("cancelInvoice");
    };

	$scope.viewInvoiceReports = function(name, id) {
		$scope.tempLoadingModal = true;
		invoiceClientService.getSchedule(id).success(function(response) {
			$scope.invoiceclientData = response;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewSchedule");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('InvoiceMcListingCtrl', ['$scope', '$location',  'invoicemcService',
function($scope, $location, invoicemcService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.invoicemcsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		invoicemcService.getInvoiceMcAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.invoicemcsList = response.data.data;
            $scope.allInvoices = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortInvoicemcListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteInvoice = function(name, id) {
		$scope.deletedInvoicemcName = name;
		$scope.deletedInvoicemcId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.viewInvoiceReports = function(name, id) {
		$scope.tempLoadingModal = true;
		invoicemcService.getSchedule(id).success(function(response) {
			$scope.invoicemcData = response;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewSchedule");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('InvoiceMcListingAdminCtrl', ['$scope', '$location',  'invoiceMcService',
function($scope, $location, invoicemcService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.invoicemcsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		invoicemcService.getInvoiceMcAdminAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.invoicemcsList = response.data.data;
            $scope.allInvoices = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortInvoicemcListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteInvoice = function(name, id) {
		$scope.invoicemcName = name;
		$scope.invoicemcId = id;
		$scope.openModal("confirmDelete");
    };
	$scope.approveInvoice = function(name, id) {
		$scope.invoicemcName = name;
		$scope.invoicemcId = id;
		$scope.openModal("approveInvoice");
    };
	$scope.cancelInvoice = function(name, id) {
		$scope.invoicemcName = name;
		$scope.invoicemcId = id;
		$scope.openModal("cancelInvoice");
    };

	$scope.viewInvoiceReports = function(name, id) {
		$scope.tempLoadingModal = true;
		invoicemcService.getSchedule(id).success(function(response) {
			$scope.invoicemcData = response;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewSchedule");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('InvoiceMcPaidListingAdminCtrl', ['$scope', '$location',  'invoiceMcService',
function($scope, $location, invoicemcService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.invoicemcsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		invoicemcService.getInvoiceMcPaidAdminAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.invoicemcsList = response.data.data;
            $scope.allInvoices = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortInvoicemcListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteInvoice = function(name, id) {
		$scope.invoicemcName = name;
		$scope.invoicemcId = id;
		$scope.openModal("confirmDelete");
    };
	$scope.approveInvoice = function(name, id) {
		$scope.invoicemcName = name;
		$scope.invoicemcId = id;
		$scope.openModal("approveInvoice");
    };
	$scope.cancelInvoice = function(name, id) {
		$scope.invoicemcName = name;
		$scope.invoicemcId = id;
		$scope.openModal("cancelInvoice");
    };

	$scope.viewInvoiceReports = function(name, id) {
		$scope.tempLoadingModal = true;
		invoicemcService.getSchedule(id).success(function(response) {
			$scope.invoicemcData = response;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewSchedule");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('MiscellaneousCtrl', ['$scope', '$location',
function($scope, $location) {

	

	
    
    
	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteRecord = function(name, id) {
		$scope.deletedRecordName = name;
		$scope.deletedRecordId = id;
		$scope.openModal("confirmDelete");
    };	
}]);
angular.module('draymasterApp')
.controller('ReportListingCtrl', ['$scope', '$location',  'reportService',
function($scope, $location, reportService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.reportsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		reportService.getAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.reportsList = response.data.data;
            $scope.allReports = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortReportListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.approveReport = function(name, id) {
		$scope.approveReportName = name;
		$scope.approveReportId = id;
		$scope.openModal("confirmApproval");
    };	

	$scope.deleteReport = function(name, id) {
		$scope.deletedReportName = name;
		$scope.deletedReportId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.sendForApproval = function(name, id) {
		$scope.submitReportId = id;
		$scope.openModal("sendForApproval");
    };
}]);
angular.module('draymasterApp')
.controller('ReportTemplateListingCtrl', ['$scope', '$location',  'reportTemplateService',
function($scope, $location, reportTemplateService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.reportTemplateData = [];
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'templateName',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.reportTemplatesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		reportTemplateService.getAll($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.reportTemplatesList = response.data;
            $scope.allReportTemplates = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortReportTemplateListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteReportTemplate = function(name, id) {
		$scope.deletedReportTemplateName = name;
		$scope.deletedReportTemplateId = id;
		$scope.openModal("confirmDelete");
    };	
}]);
angular.module('draymasterApp')
.controller('ReportTemplateListingMCCtrl', ['$scope', '$location',  'reportTemplateService',
function($scope, $location, reportTemplateService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.reportTemplateData = [];
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'templateName',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.reportTemplatesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		reportTemplateService.getMcTemplates($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.reportTemplatesList = response.data;
            $scope.allReportTemplates = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortReportTemplateListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteReportTemplate = function(name, id) {
		$scope.deletedReportTemplateName = name;
		$scope.deletedReportTemplateId = id;
		$scope.openModal("confirmDelete");
    };	
}]);
angular.module('draymasterApp')
.controller('ScheduleCreateCtrl', ['$scope', '$location',  'storeService',
function($scope, $location, storeService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.storeData = [];
	
	
    var id = '0';
	$scope.ng_store_id = '0';
	$scope.ng_address = '';
	$scope.ng_door_number = '';
	$scope.ng_door_city = '';
	$scope.ng_door_region = '';
	$scope.client_option = '';
	$scope.client_options = [{id: '', name: '--Select--'  }];
	$scope.client_id_post = "";
		
	//----- SERVICES -----
	$scope.init = function(id, client_id){
		
		if(id == ""){
			$scope.ng_store_id = '0';
		}else{
			$scope.ng_store_id = id;
		}
		if(client_id == ""){
			$scope.client_id_post = '';
		}else{
			$scope.client_id_post = client_id;
		}
		$scope.getStoreInfo();
	}

	$scope.getStoreInfo = function(){
		$scope.tempLoadingModal = true;
		storeService.getStoreById($scope.ng_store_id).success(function(response) {
			$scope.storeData = response;
			$scope.ng_address = response.address;
			$scope.ng_door_number = response.door_number;
			$scope.ng_door_city = response.door_city;
			$scope.ng_door_region = response.door_region;
            $scope.tempLoadingModal = false;
			
        });
		storeService.getStoreClients($scope.ng_store_id).success(function(response) {
			//console.log(response);
			$scope.client_options = response;
			$scope.client_option = $scope.client_id_post;
			console.log($scope.client_option);
			//$scope.storeData = response;
			
			//$scope.tempLoadingModal = false;
			$scope.tempLoadingModal = false;

		});
	};

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};


}]);
angular.module('draymasterApp')
.controller('ScheduleEditCtrl', ['$scope', '$location',  'storeService', 'scheduleService',
function($scope, $location, storeService, scheduleService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	//$scope.storeData = [];
	
	
    var id = '0';
	$scope.ng_store_id = '0';
	$scope.ng_address = '';
	$scope.ng_door_number = '';
	$scope.ng_door_city = '';
	$scope.ng_door_region = '';
		
	//----- SERVICES -----
	$scope.init = function(id){
		if(typeof id == "undefined"){
			$scope.ng_store_id = '0';
		}else{
			$scope.ng_store_id = id;
		}
		$scope.getStoreInfo();
	}

	$scope.getStoreInfo = function(){
		$scope.tempLoadingModal = true;
		storeService.getStoreById($scope.ng_store_id).success(function(response) {
			$scope.storeData = response;
			$scope.ng_address = response.address;
			$scope.ng_door_number = response.door_number;
			$scope.ng_door_city = response.door_city;
			$scope.ng_door_region = response.door_region;
            $scope.tempLoadingModal = false;
        });
	};

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};


}]);
angular.module('draymasterApp')
.controller('ScheduleListingCtrl', ['$scope', '$location',  'scheduleService',
function($scope, $location, scheduleService) {
	$scope.urlArray = $location.$$absUrl.split("/");
	$scope.urlQueryString = $location.$$absUrl.split("?");
	$scope.searchParam = "";
	if($scope.urlQueryString.length > 1){
		var searchVal = $scope.urlQueryString[1].split("=");
		if(typeof $scope.urlQueryString[1] != 'undefined'){
			for(var i = 0; i < searchVal.length; i++){
				if(searchVal[i] == 'search'){
					$scope.searchParam = searchVal[i + 1];
					break;
				}
			}
		}
		
	}
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
			page: 1,
			orderBy: 'created_at',
			order: 'desc',
			pages: ""
		};
	}
	$scope.pageNumbers = [];
    $scope.schedulesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		scheduleService.getAll($scope.main.page,$scope.main.orderBy, $scope.main.order, $scope.searchParam).success(function(response) {
            $scope.dataLoaded = true;
			$scope.schedulesList = response.data.data;
            $scope.allSchedules = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortScheduleListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteSchedule = function(name, id) {
		$scope.deletedScheduleName = name;
		$scope.deletedScheduleId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.viewSchedule = function(name, id) {
		$scope.tempLoadingModal = true;
		scheduleService.getSchedule(id).success(function(response) {
			$scope.scheduleData = response;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewSchedule");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('ScheduleListingMCCtrl', ['$scope', '$location',  'scheduleService',
function($scope, $location, scheduleService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'created_at',
				order: 'desc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.schedulesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		scheduleService.getUserSchedules($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.schedulesList = response.data.data;
            $scope.allSchedules = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortScheduleListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteSchedule = function(name, id) {
		//alert(name);
		$scope.deletedScheduleName = name;
		$scope.deletedScheduleId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.viewSchedule = function(name, id) {
		$scope.tempLoadingModal = true;
		scheduleService.getScheduleMc(id).success(function(response) {
			$scope.scheduleData = response;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewSchedule");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('StoreListingCtrl', ['$scope', '$location',  'storeService',
function($scope, $location, storeService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	$scope.urlQueryString = $location.$$absUrl.split("?");
	$scope.searchParam = "";
	$scope.clientIdParam = "";
	if($scope.urlQueryString.length > 1){
		var queryString = $scope.urlQueryString[1].split("&");
		
		if(typeof queryString != 'undefined'){
			for(var i = 0; i < queryString.length; i++){
				var queryParam = queryString[i].split("=");
				if(typeof queryParam != "undefined"){
					for(var j = 0; j < queryParam.length; j++){
						if(queryParam[j] == 'search'){
							$scope.searchParam = queryParam[j + 1];
							//break;
						}
						if(queryParam[j] == 'client_id_single'){
							$scope.clientIdParam = queryParam[j + 1];
						}
					}
				}
			}
		}
		

		/*var searchVal = $scope.urlQueryString[1].split("=");
		if(typeof $scope.urlQueryString[1] != 'undefined'){
			console.log(searchVal);
			for(var i = 0; i < searchVal.length; i++){
				if(searchVal[i] == 'search'){
					$scope.searchParam = searchVal[i + 1];
					break;
				}
			}
		}*/
	}
	//$scope.storeData = [];
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'corporation',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.storesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		storeService.getAll($scope.main.page,$scope.main.orderBy, $scope.main.order,$scope.searchParam, $scope.clientIdParam).success(function(response) {
            $scope.dataLoaded = true;
			$scope.storesList = response.data;
            $scope.allStores = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortStoreListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteStore = function(name, id) {
		$scope.deletedStoreName = name;
		$scope.deletedStoreId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.viewStore = function(name, id) {
		$scope.tempLoadingModal = true;
		storeService.getStore(id).success(function(response) {
			$scope.storeData = response.store;
			$scope.storeData.clients = response.clients;
			$scope.viewStoreName = name;
			$scope.viewStoreId = id;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewStore");
		});
		
    };

	
}]);
angular.module('draymasterApp')
.controller('SupervisorListingCtrl', ['$scope', '$location',  'supervisorService',
function($scope, $location, supervisorService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'name',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.supervisorsList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		supervisorService.getUserSupervisors($scope.main.page,$scope.main.orderBy, $scope.main.order).success(function(response) {
            $scope.dataLoaded = true;
			$scope.supervisorsList = response.data;
            $scope.allSupervisors = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortSupervisorListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteSupervisor = function(name, id) {
		$scope.deletedSupervisorName = name;
		$scope.deletedSupervisorId = id;
		$scope.openModal("confirmDelete");
    };
}]);
angular.module('draymasterApp')
.controller('UserStoreListingCtrl', ['$scope', '$location',  'storeService',
function($scope, $location, storeService) {

	$scope.urlArray = $location.$$absUrl.split("/");
	
	$scope.urlQueryString = $location.$$absUrl.split("?");
	$scope.searchParam = "";
	if($scope.urlQueryString.length > 1){
		var searchVal = $scope.urlQueryString[1].split("=");
		if(typeof $scope.urlQueryString[1] != 'undefined'){
			for(var i = 0; i < searchVal.length; i++){
				if(searchVal[i] == 'search'){
					$scope.searchParam = searchVal[i + 1];
					break;
				}
			}
		}
		
	}
	
	if($scope.urlArray.length == 9){
		$scope.page = $scope.urlArray[$scope.urlArray.length - 3];
		$scope.orderBy = $scope.urlArray[$scope.urlArray.length - 2];
		$scope.order = $scope.urlArray[$scope.urlArray.length - 1];
		$scope.main = {
                page: parseInt($scope.page),
                orderBy: $scope.orderBy,
				order: $scope.order,
				pages: ""
            };
	}else{
		$scope.main = {
                page: 1,
                orderBy: 'corporation',
				order: 'asc',
				pages: ""
            };
	}

	
    
    $scope.pageNumbers = [];
    $scope.storesList = [];
    $scope.dataLoaded = false;
	$scope.sort = {
            column: $scope.main.orderBy,
            descending: false
        }; 
	if (!$scope.params) $scope.params = {};
		
	//----- SERVICES -----
    
	$scope.init = function(){
		$scope.tempLoadingModal = true;
		//alert($scope.searchParam);
		storeService.getUserStores($scope.main.page,$scope.main.orderBy, $scope.main.order, $scope.searchParam).success(function(response) {
            $scope.dataLoaded = true;
			$scope.storesList = response.data;
            $scope.allStores = response;
			
			$scope.main.pages = response.last_page;
			
			var startPage = $scope.main.page - 4;
			var endPage = $scope.main.page + 4;
			if(startPage <= 0){
				
				endPage -= (startPage - 1);
				startPage = 1;
				
			}
			
			if(endPage > $scope.main.pages){
				endPage = $scope.main.pages;
			}
			$scope.pageNumbers = [];
			//alert(endPage);
			
			for(var i = startPage; i <= endPage; i++){
				$scope.pageNumbers.push(i);
			}
			$scope.tempLoadingModal = false;
        });
	};

	$scope.nextPage = function() {
		if ($scope.main.page < $scope.main.pages) {
			
			$scope.main.page++;
			$scope.init();
		}
	};
	
	$scope.prevPage = function() {
		if ($scope.main.page > 1) {
			$scope.main.page--;
			$scope.init();
		}
	};

	$scope.firstPage = function(){
		if ($scope.main.page > 1) {
			$scope.main.page = 1;
			$scope.init();
		}
	}

	$scope.lastPage = function(){
		if ($scope.main.page < $scope.main.pages) {
			$scope.main.page = $scope.main.pages;
			$scope.init();
		}
	}
	$scope.setPage = function(clicked_page){
		if (clicked_page > 0 && clicked_page <= $scope.main.pages) {
			$scope.main.page = clicked_page;
			$scope.init();
		}
	}

	$scope.sortStoreListing = function(column) {
		var sort = $scope.sort;
		if (sort.column == column) {
			sort.descending = !sort.descending;
		} else {
			sort.column = column;
			sort.descending = false;
		}
		if(sort.descending){
			order = 'asc';
		}else{
			order = 'desc';
		}
		$scope.selectedCls = function(column) {
			return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
		};
		$scope.main.orderBy = sort.column;
		$scope.main.order = order;
		$scope.init();
		
    };

	$scope.openModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = true');
    };

	$scope.closeModal = function(modalName) {
		eval('$scope.' + modalName + 'Modal = false');
	};

	$scope.deleteStore = function(name, id) {
		$scope.deletedStoreName = name;
		$scope.deletedStoreId = id;
		$scope.openModal("confirmDelete");
    };

	$scope.viewStore = function(name, id) {
		$scope.tempLoadingModal = true;
		storeService.getUserStore(id).success(function(response) {
			$scope.storeData = response.store;
			$scope.storeData.clients = response.clients;
			$scope.viewStoreName = name;
			$scope.viewStoreId = id;
			$scope.tempLoadingModal = false;
			$scope.openModal("viewStore");
		});
		
    };

	
}]);
angular.module("draymasterApp")
.directive("datepicker", function() {
  return {
    link: function(scope, element, attrs) {
      element.datepicker();
    }
  };
});
angular.module("draymasterApp")
.directive("enablePopover", function() {
  return {
    link: function(scope, element, attrs) {
      element.popover({container: 'body', html: true});
    }
};
});
  angular.module('draymasterApp')
  .directive("icheck", ['$timeout', function($timeout) {
  return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = attrs['value'];

                scope.$watch(attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                });

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal-blue'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && attrs['ngModel']) {
                        scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                });
            });
        }
    };     
  }]);
angular.module("draymasterApp")
.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex = 0;

		scope.next=function(){
			scope.currentIndex < scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},5000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		angular.element(document.querySelectorAll('.arrow')).one('click',function(){
			$timeout.cancel(timer);
		});

    },
	template: '<div class="slider">'+
			  '<div class="slide" ng-repeat="image in images" ng-show="image.visible">'+
				'<img  ng-src="{{image.src}}" />'+
			  '</div>'+
			  '<div class="arrows">'+
				'<a href="#" ng-click="prev()">'+
				  '<img src="http://extremecss.com/demos/slider/img/left-arrow.png" />'+
				'</a>'+
				'<a href="#" ng-click="next()">'+
				  '<img  src="http://extremecss.com/demos/slider/img/right-arrow.png" />'+
				'</a>'+
			  '</div>'+
			'</div>'
  }
});
angular.module('draymasterApp')
.directive('mapControls', function() {
    return {
      restrict: 'A',
      templateUrl: '/js/template/custom/mapControls.html',
      link: function(scope, element, attrs) {
        
      }
    };    
});
angular.module('draymasterApp')
.directive('milesSlider', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      return $timeout(function() {

          element.slider({ 
            min:20, 
            max: 800, 
            value: 250, 
            range: "min",
            step: 5,
            slide: function(event, ui) {
              scope.$apply(function(){
                scope.terminalGroups[attrs.milesSlider].milesServed = ui.value;
              });
            }
          });
        
      });
    }
  };
}]);
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
angular.module('draymasterApp')
.directive('ratesDataTable', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    scope: {
      tariff: '='
    },
    templateUrl: '/js/template/custom/rates.html',
    controller: function($scope) {
      this.provideRates = function(){
        return $scope.tariff.rates;
      };
    },
    link: function () {
      return $timeout(function() {
        
        $('#ratesTableSlot [data-provide="datatable"]').each (function () {	
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
angular.module('draymasterApp')
.directive('repeatMissingRates', function() {
    return {
      require: '^missingRatesDataTable',
      link: function(scope, element, attrs, missingRatesCtrl) {
        var rates = missingRatesCtrl.provideRates();
        var html = '';
        for(var i=0; i < rates.length; i++) {
          html +=  "<tr class='clickable-missing-rate'>"+
                   "<td class='hidden'>"+i+"</td>"+
                   "<td>"+rates[i].city+"</td>"+
                   "<td>"+rates[i].state+"</td>"+
                   "<td>"+rates[i].zip+"</td>"+
                   "<td>"+rates[i].miles+"</td>"+
                   "</tr>";
        }
        element.append(html);
      }
    };
});
angular.module('draymasterApp')
.directive('repeatRates', function() {
    return {
      require: '^ratesDataTable',
      link: function(scope, element, attrs, ratesCtrl) {
        var rates = ratesCtrl.provideRates();
        var html = '';
        for(var i=0; i < rates.length; i++) {
          html +=  "<tr class='clickable-rate'>"+
                   "<td class='hidden'>"+i+"</td>"+
                   "<td>"+rates[i].city+"</td>"+
                   "<td>"+rates[i].state+"</td>"+
                   "<td>"+rates[i].zip+"</td>"+
                   "<td>"+rates[i].miles+"</td>"+
                   "<td>$"+rates[i].price+"<a href='javascript:;' style='color:#f0ad4e;padding-left:5px;'><i class='fa fa-pencil'></i></a></td>"+
                   "<td><input type='checkbox' "+ ((rates[i].freeDrop)? 'checked' : '' ) +" class='free-drop-checkbox'/></td>"+
                   "</tr>";
        }
        element.append(html);
      }
    };
});
angular.module('draymasterApp')
.directive('uploadCsv', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			var model = $parse(attrs.uploadCsv);
			var modelSetter = model.assign;

			element.bind('change', function (event) {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
					var CSV_REGEX = new RegExp('^\\w\+\.csv$');
					if(CSV_REGEX.test(element[0].files[0].name)) {
						scope.uploadErrors = '';
						scope.invalidFile = false;
					} else {
						scope.uploadErrors = 'Invalid file format. Please upload a CSV file with no spaces or dashes in the name.';
						scope.invalidFile = true;
					}
				});

			});

		}
	};
}]);
angular.module('draymasterApp')
.directive('validateCity', ['cityService', '$timeout', function(cityService, $timeout) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ctrl) {
       
        var cities = [];
        var timer;
        cityService.all().success(function(data){
          for(var i=0; i < data.length; i++) {
            cities.push(data[i].city);
          }
        });
        
        function validate() {
          if(timer) {
            $timeout.cancel(timer);
          }

          if(attrs.validateCity === 'allow_blanks') {
            if(element.val() === '') {
              ctrl.$setValidity('cityValidate', true);
              return;
            }
          }

          timer = $timeout(function(){
            var match = '';
            match = cities.filter(function(item){ return item === element.val(); });
            if(match.length > 0) {
              ctrl.$setValidity('cityValidate', true);
              scope.$apply();
            } else {
              ctrl.$setValidity('cityValidate', false);
              scope.$apply();
            }
          }, 300);
        }
        
        element.bind('keyup', function() {
          validate();
        });
        
        scope.$on('typeaheadSelected', function() {
          validate();
        });
      }
    };
}]);
angular.module('draymasterApp')
.directive('validateCurrency', function() {
  var currency_REGEX = new RegExp('\^\\d\+\(\.\\d\{2\}\)\?\$');
  return {
    require: '?ngModel',
    link: function(scope,element,attrs,ngModel) {
      
      var init = false;
      
      function validate() {
        if(currency_REGEX.test(ngModel.$viewValue)) {
          ngModel.$setValidity('validateCurrency', true);
        } else {
          ngModel.$setValidity('validateCurrency', false);
        }
        if(attrs.showParentError === 'true') {
          (ngModel.$invalid)? element.parent().addClass('has-error') : element.parent().removeClass('has-error');
        }
        if(!scope.$$phase){scope.$apply();};
      }
      
      element.bind('keyup',function() {
        validate();
      });
      
      attrs.$observe('active', function(val) {
        if(val === 'false') {
          if(!scope.$$phase) {
            scope.$apply(function() {
              ngModel.$setValidity('validateCurrency', true);
              element.parent().removeClass('has-error');
            });
          } else {
            ngModel.$setValidity('validateCurrency', true);
            element.parent().removeClass('has-error');
          }
        } else if(val === 'true') {
          if(init === true) {
            validate();
          } else {
            init = true;
          }
        }
      });
      
    }
  };
});
angular.module('draymasterApp')
    .directive('validateNumber', function () {
        var NUMBER_REGEX = new RegExp('^[\-]?[0-9]*[.]?[0-9]+$'); 
        
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
              function validate(value) {
				 
                if (NUMBER_REGEX.test(value)) {
					
                    ctrl.$setValidity('validateNumber', true);
                    return value;
					
                } else {
					
                    ctrl.$setValidity('validateNumber', false);
                    return undefined;
                }
              }
              ctrl.$parsers.unshift(validate);
              ctrl.$formatters.unshift(validate);
            }
        };
    });
angular.module('draymasterApp')
    .directive('validateZip', function () {
        var ZIP_REGEX = new RegExp('^\\d{5}$'); // RegExp for US Zip Codes
        var CZIP_REGEX = new RegExp('^[ABCEGHJKLMNPRSTVXY]\\d[A-Z] ?\\d[A-Z]\\d$', 'i'); // RegExp for Canada Zip Codes
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
              function validate(value) {
				
                if (ZIP_REGEX.test(value) || CZIP_REGEX.test(value)) {
                    ctrl.$setValidity('validateZip', true);
                    return value;
                } else {
                    ctrl.$setValidity('validateZip', false);
                    return undefined;
                }
              }
              ctrl.$parsers.unshift(validate);
              ctrl.$formatters.unshift(validate);
            }
        };
    });
angular.module('draymasterApp')
.filter('accessorialStatus', function() {
    return function(input) {
      if(input > 0) {
        return 'APPLIED (' + input + ')';
      } else {
        return 'UNUSED';
      }
    };
});
angular.module('draymasterApp')
.filter('errorCount', function() {
    return function(input) {
      var errors = input;
      if(errors > 1) {
        return errors + ' errors were';
      } else {
        return errors + ' error was';
      }
    };
});
angular.module('draymasterApp')
.filter('properNoun', function() {
  return function(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});
angular.module('draymasterApp').
filter('selectAllButtonText', function() {
    return function(input) {
      if(input === false) {
        return 'Select All Visible';
      } else {
        return 'Unselect All Visible';
      }
    };
});
angular.module('draymasterApp')
.filter('timeRemaining', function() {
	return function(input) {
		var minutes = input;
    if(minutes <= 1) {
			return '1 Minute';
		} else if(minutes > 1 && minutes <= 60) {
			return minutes + ' Minutes';
		} else {
			var hours = Math.floor(minutes/60);
			var updatedMinutes = minutes - (hours*60);
			if(hours === 1 && updatedMinutes > 1) {
				return hours + ' Hour ' + updatedMinutes + ' Minutes';
			} else if(hours ===1 && updatedMinutes <= 1) {
				return hours + ' Hour ' + updatedMinutes + ' Minute';
			} else if(hours > 1 && updatedMinutes > 1) {
				return hours + ' Hours ' + updatedMinutes + ' Minutes';
			} else {
				return hours + ' Hours ' + updatedMinutes + ' Minute';
			}
		}
	};
});
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
angular.module('draymasterApp')
.factory('dateService', function() {

  return {
    getCurrentDate: function() {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      return month + '-' + day + '-' + year;
    }
  };
          
});
angular.module('draymasterApp')
.factory('imageSliderService', function($http){
    
    var baseUrlAdmin = '/service/admin/reports/';
	var baseUrlUser = '/service/images/';
	return {
        getClientReportImages: function() {
			return $http.get(baseUrlUser + 'getReportImages');
        }
    };
}); 
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
angular.module('draymasterApp')
.factory('reportService', function($http){
    
    var baseUrlAdmin = '/service/admin/reports/';
	var baseUrlUser = '/service/reports/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getAllApproved: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAllApproved?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getReport: function(reportId){
			return $http.get(baseUrlUser + 'getReport/' + reportId);
		}
    };
}); 
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
angular.module('draymasterApp')
.factory('supervisorService', function($http){
    
    var baseUrlAdmin = '/service/admin/supervisors/';
	var baseUrlUser = '/service/supervisors/';
	return {
        getAll: function(page,orderBy,order) {
			return $http.get(baseUrlAdmin + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getSupervisor: function(supervisorId){
			return $http.get(baseUrlAdmin + 'getSupervisor/' + supervisorId);
		},
		getUserSupervisors: function(page,orderBy,order) {
			return $http.get(baseUrlUser + 'getAll?page=' + page + '&orderBy=' + orderBy + '&order=' + order);
        },
		getUserSupervisor: function(supervisorId){
			return $http.get(baseUrlUser + 'getSupervisor/' + supervisorId);
		}
    };
}); 