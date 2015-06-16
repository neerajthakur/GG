      

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

//Image upload
$(document).ready(function() {
	    var options = { 
        beforeSubmit:  showRequest,
        success:       showResponse,
        dataType: 'json' 
        }; 
     $('body').delegate('#file_browse','change', function(){
		$("#output").html("<img src='/images/ajax-loader.gif' />");
         $('#upload').ajaxForm(options).submit();          
     });
	 
	 $("label.error_message").each(function(){
		 if($(this).html() != ""){
			if($(this).prev("div.select_div").length > 0){
				$(this).prev("div.select_div").css('border','1px solid #ff0000');
			}else{
				$(this).prev("input[type=text]").css('border','1px solid #ff0000');
				$(this).prev("input[type=password]").css('border','1px solid #ff0000');
				$(this).removeClass('hide');
			}
			
			
			
			//alert($(this).html().length);
		 }
		
	 });
	 $(".formfield input[type=text]").focus(function(){
		 $(this).next("label.error_message").addClass('hide');
	 });

	 $(".formfield input[type=password]").focus(function(){
		 $(this).next("label.error_message").addClass('hide');
	 });

	 $(".titlefield input[type=text]").focus(function(){
		 $(this).next("label.error_message").addClass('hide');
	 });
});        
function showRequest(formData, jqForm, options) { 
    $("#validation-errors").hide().empty();
    $("#output").css('display','none');
    return true; 
} 
function showResponse(response, statusText, xhr, $form)  { 
    if(response.success == false)
    {
        var arr = response.errors;
        $.each(arr, function(index, value)
        {
            if (value.length != 0)
            {
                $("#validation-errors").append('<div class="alert alert-error"><strong>'+ value +'</strong><div>');
            }
        });
        $("#validation-errors").show();
    } else {
         $("#output").html("<img src='"+response.file+"' />");
         $("#output").css('display','block');
    }
}
      