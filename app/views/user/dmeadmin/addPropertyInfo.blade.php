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
						<div class="previoustab">Add Company Info</div>
					</li>
					<li>
						<small></small>
					</li>
					<li>
						<div class="presenttab">Add Property<span></span></div>
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
					<form class="form-horizontal" id="upload" enctype="multipart/form-data" method="post" action="{{ url('upload/image') }}" autocomplete="off">
						<span style = "position:relative;background: #d8d8d8"><label id = "output" style = "left: 14px;position: absolute;top: 14px;"><img src = "{{ Session::get('userUploadedPropertyImageThumb', '/images/upload-logo.png'); }}" /></label><input type="file" name="image" id="file_browse" /> </span>
						<small>Upload Property Picture</small>
						<input type="hidden" name="_token" value="{{ csrf_token() }}" />
						<input type="hidden" name="image_type" value="property" />
						
					</form>
				</div>
				{{ Form::open(array('id'=>'login-form','class'=>'form','files'=>true)) }}
				<div class="titlefield">
					<span>Property Name</span>
					{{ Form::text('property_name', Input::old('property_name'), array('class'=>'', 'placeholder' => 'Property name here')) }}
					{{ Form::hidden('form_type', "property") }}
					{{ Form::hidden('member_id', $member_id) }}

				</div>
				<div class="properOuter">
					<div class="business-type">
				<div class="forminner">
					<div class="formfield">
						<span>Address*</span>
						{{ Form::text('property_address', Input::old('property_address'), array('class'=>'')) }}
					</div>
					<div class="formfield">
						<span>Suite#</span>
						{{ Form::text('property_suite', Input::old('property_suite'), array('class'=>'')) }}
					</div>
					<div class="formfieldDevide">
								<div class="formfield">
									<span>City</span>
									{{ Form::text('property_city', Input::old('property_city'), array('class'=>'')) }}
								</div>
								<div class="formfield">
									<span>State</span>
									{{ Form::text('property_state', Input::old('property_state'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Country</span>
									{{ Form::select('property_country_id', $countries, null, array('class'=>'business-Type')) }}
									
								</div>
								<div class="formfield">
									<span>Zip-Code</span>
									{{ Form::text('property_zipcode', Input::old('property_zipcode'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Phone</span>
									{{ Form::text('property_phone', Input::old('property_phone'), array('class'=>'')) }}
								</div>
								<div class="formfield">
									<span>Fax</span>
									{{ Form::text('property_fax', Input::old('property_fax'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfield">
								<span>Email</span>
								{{ Form::text('property_email', Input::old('property_email'), array('class'=>'')) }}
							</div>
							<div class="formfield">
								<span>Website</span>
								{{ Form::text('property_website', Input::old('property_website'), array('class'=>'')) }}
							</div>
							<div class="formfield">
								<span>Property Description</span>
								{{ Form::textarea('property_description', Input::old('property_description'), array('class'=>'')) }}
							</div>
				</div>
				</div>



				<div class="poroperty-right">
						<div class="forminner">
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Legacy Membership Code</span>
									{{ Form::text('property_membership_code', Input::old('property_membership_code'), array('class'=>'')) }}
								</div>
								<div class="formfield">
									<span>Certification Standard</span>
									{{ Form::select('property_certification_standard_id', $certificationStandards, null, array('class'=>'business-Type')) }}
								</div>
								<div class="formfield authorized">
									{{ Form::checkbox('property_preauthorize_audit', '1', (Input::old('property_preauthorize_audit') == '1') ? false : true) }}<label>Pre-Authorize First Audit</label>
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Property Type</span>
									{{ Form::select('property_type_id', $propertyTypes, null, array('class'=>'business-Type')) }}
								</div>
								
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Property Size</span>
									{{ Form::select('property_size_id', $propertySizes, null, array('class'=>'business-Type')) }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="companySave">
					<input type="submit" value="Save Property Info & Add User" class="next-company" name = "save_and_continue"> 
					<input type="submit" value="Save & Back to Members' List" class="save-views" name = "save_and_back">
				</div>
				<div class="formfield cancel-memberlist">
					<a href="#">Cancel & Back to Members List</a>
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
<script>
  $(function() {
    $('#toggle-one').bootstrapToggle();
  })
  $(function(){
	$('input:checkbox').screwDefaultButtons({
	image: 'url("/images/checkbox.png")',
	width: 26,
	height: 26
	});
});
</script>
@endsection