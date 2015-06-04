      

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
	 
	
	
});
      