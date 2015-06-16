@extends('layout.dmeadmin.default')
@section('active_members_class')
active
@endsection
@section('content')
	<div id="page-wrapper" class="page-wrapper-cls">
			
            <div id="page-inner">
              <div class="toptabingpanel">
			  <ul>
					<li>
						<div class="presenttab">Add Company Info<span></span></div>
					</li>
					<li>
						<small></small>
					</li>
					<li>
						<div class="next-tab">Add Property</div>
					</li>
					<li>
						<small></small>
					</li>
					<li>
						<div class="next-tab">Add User</div>
					</li>
				</ul>
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
			
			<div class="adduserform-main upload-logo-panel company-panel">
				<div class="uploadphoto-panel">
					<form class="form-horizontal" id="upload" enctype = "multipart/form-data" method="post" action="{{ url('upload/image') }}" autocomplete="off">
						<span style = "position:relative;background: #d8d8d8"><label id = "output" style = "left: 14px;position: absolute;top: 14px;"><img src = "{{ Session::get('userUploadedCompanyImageThumb', '/images/upload-logo.png'); }}" /></label><input type="file" name="image" id="file_browse" /> </span>
						<small>Upload Profile Picture</small>
						<input type="hidden" name="_token" value="{{ csrf_token() }}" />
						<input type="hidden" name="image_type" value="company" />
						
					</form>
				</div>
				{{ Form::open(array('id'=>'login-form','class'=>'form','files'=>true)) }}
				<div class="titlefield">
					<span>Company Name*</span>
					{{ Form::text('company_name', Input::old('company_name'), array('class'=>'', 'placeholder' => '')) }}
					{{ Form::hidden('form_type', "member") }}
				</div>
				<div class="properOuter">
					<div class="business-type">
				<div class="forminner">
					<div class="formfield">
						<span>Company Code*</span>
						{{ Form::text('company_code', Input::old('company_code'), array('class'=>'')) }}
					</div>
					<div class="formfield">
						<span>Address*</span>
						{{ Form::text('company_address', Input::old('company_address'), array('class'=>'')) }}
					</div>
					<div class="formfield">
						<span>Suite#</span>
						{{ Form::text('company_suite', Input::old('company_suite'), array('class'=>'')) }}
					</div>
					<div class="formfieldDevide">
								<div class="formfield">
									<span>City*</span>
									{{ Form::text('company_city', Input::old('company_city'), array('class'=>'')) }}
								</div>
								<div class="formfield">
									<span>State*</span>
									{{ Form::text('company_state', Input::old('company_state'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Country*</span>
									{{ Form::select('company_country_id', $countries, null, array('class'=>'business-Type')) }}
									
								</div>
								<div class="formfield">
									<span>Zip-Code*</span>
									{{ Form::text('company_zipcode', Input::old('company_zipcode'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Phone*</span>
									{{ Form::text('company_phone', Input::old('company_phone'), array('class'=>'')) }}
								</div>
								<div class="formfield">
									<span>Fax</span>
									{{ Form::text('company_fax', Input::old('company_fax'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfield">
								<span>Email</span>
								{{ Form::text('company_email', Input::old('company_email'), array('class'=>'')) }}
							</div>
							<div class="formfield">
								<span>Website</span>
								{{ Form::text('company_website', Input::old('company_website'), array('class'=>'')) }}
							</div>
							<div class="formfield">
								<span>Company Description</span>
								{{ Form::textarea('company_description', Input::old('company_description'), array('class'=>'')) }}
							</div>
				</div>
				</div>
				</div>
				<div class="companySave">
					<input type="submit" value="Save Company Info & Add Property" name = "save_and_continue" class="next-company">
					<input type="submit" value="Save & Back to Members' List" name = "save_and_back" class="save-views">
				</div>
				<div class="formfield cancel-memberlist">
					<a href="#">Cancel & Back to Members' List</a>
				</div>	
				{{ Form::close() }}
			</div>
            
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