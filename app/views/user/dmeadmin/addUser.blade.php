@extends('layout.dmeadmin.default')
@section('active_users_class')
active
@endsection
@section('content')
	<div id="page-wrapper" class="page-wrapper-cls">
			
            <div id="page-inner">
              <div class="toptabingpanel">
				<?php $messages = $errors->all('<p>:message</p>') ?>
			<?php 
				
				if(count($messages) > 0){
					echo "<div class = 'error-message-box'>";
						foreach($messages as $msg){
							echo $msg;
						}
					echo "</div>";	
				}
				
			?>
			<?php if(Session::has('account_success')): ?>
			<div class="alert alert-success">
					<p>{{ Session::get('account_success') }}</p>
			</div>
		<?php endif; ?>
			  </div>
			
			<div class="adduserform-main">

				<div class="uploadphoto-panel">
					
					<form class="form-horizontal" id="upload" enctype="multipart/form-data" method="post" action="{{ url('upload/image') }}" autocomplete="off">
						<span class="uploadaddUser" ><label id = "output"><img src = "{{ Session::get('userUploadedImageThumb', '/images/usericon.png'); }}" /></label><input type="file" name="image" id="file_browse" /> </span>
						<small>Upload Profile Picture</small>
						<input type="hidden" name="_token" value="{{ csrf_token() }}" />
						<input type="hidden" name="image_type" value="user" />
						
					</form>
				</div>
				{{ Form::open(array('id'=>'login-form','class'=>'form','files'=>true)) }}
				<div class="titlefield">
					<span>Title</span>
					{{ Form::text('title', Input::old('title'), array('class'=>'form-control')) }}
					{{ Form::hidden('form_type', "user") }}
				</div>
				<div class="properOuter">
				<div class="forminner">
					<div class="formfield">
						<span>Name*</span>
						{{ Form::text('name', Input::old('name'), array('class'=>'form-control')) }}
					</div>
					<div class="formfield">
						<span>Email*</span>
						{{ Form::text('email', Input::old('email'), array('class'=>'form-control')) }}
					</div>
					<div class="formfield">
						<span>Phone</span>
						{{ Form::text('phone', Input::old('phone'), array('class'=>'form-control')) }}
					</div>
					<div class="formfield">
						<span>Password*</span>
						{{ Form::password('password') }}
					</div>
					<div class="formfield">
						<span>Confirm Password*</span>
						{{ Form::password('password_confirmation') }}
					</div>

					<div class="adminusermain">
						<label class="switch switch-green">
							
							{{ Form::checkbox('usertype', 'admin', (Input::old('usertype') == 'admin') ? true : false, array('class'=>'switch-input')) }}
							<span class="switch-label" data-on="On" data-off="Off"></span>
							<span class="switch-handle"></span>
						</label>
						<font>Is Admin User</font>
					</div>
					<div class="adminusermain notification">
						<label class="switch switch-green">
							{{ Form::checkbox('settings', 'notifications', (Input::old('usertype') == 'notifications') ? true : false, array('class'=>'switch-input')) }}
							<span class="switch-label" data-on="On" data-off="Off"></span>
							<span class="switch-handle"></span>
						</label>
					<font>Notifications</font>
					</div>
				</div>
				</div>
				<input type="submit" value="Add User" class="">
				<small><a href="#">Cancel</a></small>
				{{ Form::close() }}
			</div>
            <!-- /. PAGE INNER  -->
        </div>
		
		</div>



@endsection
@section('script')
	<script type="text/javascript">
<!--
$(document).ready(function() {
	    var options = { 
                beforeSubmit:  showRequest,
        success:       showResponse,
        dataType: 'json' 
        }; 
     $('body').delegate('#file_browse','change', function(){
         $('#upload').ajaxForm(options).submit();          
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
//-->
</script>
@endsection