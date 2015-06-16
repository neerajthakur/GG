      

$(document).ready(function () {
    /*====================================
           METIS MENU 
     ======================================*/

    $('#main-menu').metisMenu();


    $(window).bind("load resize", function () {
        if ($(this).width() < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    });
   
   
     $('select').selectpicker();

	  $(".mobilechat-panel a").click(function(event){
        //$(".mobilechat-view").slideToggle('slow');
		//$(".contact-agent a").toggleClass("active");
		if( $(".mobilechat-view").is(":visible")){
			$(".mobilechat-view").slideUp('slow');
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
			$(".mobilechat-view").slideDown('top');
		}
    });
   
   	  $(".mobilesearch a").click(function(event){
		if( $(".searchpanel-mobile").is(":visible")){
			$(".searchpanel-mobile").slideUp('slow');
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
			$(".searchpanel-mobile").slideDown('top');
		}
    });
	 
	
	//right side slide
	
	
	$('.close-btn').on('click',function(e){
		e.preventDefault();
		$('.toggle-rightside').removeClass('right-side-main');			
		$('.modal-blur').fadeOut('1000');
	});	

      	
	$('.btn-expand').on('click',function(e){
		if($('#mod-navigation').hasClass('hiding')) {
			$('#mod-navigation').addClass('expanded').removeClass('hiding');
			$('body').addClass('pinned');
			
		} else {
			$('#mod-navigation').addClass('hiding').removeClass('expanded');
			$('body').removeClass('pinned');
		}
	});

		$('.adduserbar-mobileview').on('click',function(e){
		if($('.adduserbar-container').hasClass('hiding')) {
			$('.adduserbar-container').addClass('active').removeClass('hiding');
			
		} else {
			$('.adduserbar-container').addClass('hiding').removeClass('active');
	
		}
	});
/* 12 June 2015 */

$('.droplinks span.icon').on('click',function(e){
		if($('.menu ').hasClass('hide')) {
			$('.menu').addClass('show').removeClass('hide');
			
		} else {
			$('.menu').addClass('hide').removeClass('show');
	
		}
	});
	
});
      