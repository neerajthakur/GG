@extends('layout.dmeadmin.default')
@section('active_members_class')
active
@endsection
@section('content')
	<div id="page-wrapper" class="page-wrapper-cls">
			
            <div id="page-inner">
              <div class="toptabingpanel">
			  
			
			<?php if(Session::has('account_success')): ?>
			<div class="alert alert-success">
					<p>{{ Session::get('account_success') }}</p>
			</div>
		<?php endif; ?>
			  </div>
			
			<div class="adduserform-main upload-logo-panel company-panel">
				<div class="uploadphoto-panel">
					<form class="form-horizontal" id="upload" enctype = "multipart/form-data" method="post" action="{{ url('upload/image/edit', $record->hash) }}" autocomplete="off">
						<span style = "position:relative;background: #d8d8d8">
						<label id = "output" style = "left: 14px;position: absolute;top: 14px;">
						<?php 
							if($record->property_image != ""){
								$image_path = ImgProxy::link($record->property_image, 0, 81);
							}else{
								$image_path = ImgProxy::link("/images/upload-logo.png", 0, 81);
							}
						?>

						<img src = "{{ $image_path }}" /></label><input type="file" name="image" id="file_browse" />						</span>
						<small>Upload Property Picture</small>
						<input type="hidden" name="_token" value="{{ csrf_token() }}" />
						<input type="hidden" name="image_type" value="property" />
						
					</form>
				</div>
				
				{{ Form::model($record, array('action' => array('PropertyController@propertyEditPost', $record->hash), 'method' => 'post') ) }}
				<div class="titlefield">
					<span>Property Name*</span>
					{{ Form::text('property_name', Input::old('property_name'), array('class'=>'')) }}
					<label class = "error_message hide">{{ $errors->first('property_name') }}</label>
					{{ Form::hidden('form_type', "property") }}
					{{ Form::hidden('property_hash', $record->hash) }}
					{{ Form::hidden('property_id', $record->id) }}
					{{ Form::hidden('company_hash', $record->member_hash) }}


				</div>
				<div class="properOuter">
					<div class="business-type">
				<div class="forminner">
					<div class="formfield">
						<span>Address*</span>
						{{ Form::text('property_address', Input::old('property_address'), array('class'=>'')) }}
						<label class = "error_message hide">{{ $errors->first('property_address') }}</label>

					</div>
					<div class="formfield">
						<span>Suite#</span>
						{{ Form::text('property_suite', Input::old('property_suite'), array('class'=>'')) }}
					</div>
					<div class="formfieldDevide">
								<div class="formfield">
									<span>City*</span>
									{{ Form::text('property_city', Input::old('property_city'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('property_city') }}</label>
								</div>
								<div class="formfield">
									<span>State*</span>
									{{ Form::text('property_state', Input::old('property_state'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('property_state') }}</label>
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Country*</span>
									<div class = "select_div">
									{{ Form::select('property_country_id', $countries, null, array('class'=>'business-Type', 'style'=>'border: 1px solid #ff0000')) }}
									</div>
									<label class = "error_message hide">{{ $errors->first('property_country_id') }}</label>
									
								</div>
								<div class="formfield">
									<span>Zip-Code*</span>
									{{ Form::text('property_zipcode', Input::old('property_zipcode'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('property_zipcode') }}</label>
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Phone*</span>
									{{ Form::text('property_phone', Input::old('property_phone'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('property_phone') }}</label>
								</div>
								<div class="formfield">
									<span>Fax</span>
									{{ Form::text('property_fax', Input::old('property_fax'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfield">
								<span>Email</span>
								{{ Form::text('property_email', Input::old('property_email'), array('class'=>'')) }}
								<label class = "error_message hide">{{ $errors->first('property_email') }}</label>
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
									<span>Certification Standard*</span>
									<div class = "select_div">
									{{ Form::select('property_certification_standard_id', $certificationStandards, null, array('class'=>'business-Type')) }}
									</div>
									<label class = "error_message hide">{{ $errors->first('property_certification_standard_id') }}</label>
								</div>
								<div class="formfield authorized">
									{{ Form::checkbox('property_preauthorize_audit', '1', (Input::old('property_preauthorize_audit') == '1') ? false : true) }}<label>Pre-Authorize First Audit</label>
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Property Type*</span>
									<div class = "select_div">
									{{ Form::select('property_type_id', $propertyTypes, null, array('class'=>'business-Type')) }}
									</div>
									<label class = "error_message hide">{{ $errors->first('property_type_id') }}</label>
								</div>
								
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Property Size*</span>
									<div class = "select_div">
									{{ Form::select('property_size_id', $propertySizes, null, array('class'=>'business-Type')) }}
									</div>
									<label class = "error_message hide">{{ $errors->first('property_size_id') }}</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="companySave">
					<input type="submit" value="Save & Back to Propertise" class="next-company" name = "save_and_propertise"> 
					<input type="submit" value="Save & Back to Members' List" class="save-views" name = "save_and_members">
				</div>
				<div class="formfield cancel-memberlist">
					<a href="/admin/members/list">Cancel & Back to Members List</a>
				</div>	
				{{ Form::close() }}
			</div>
            
        </div>
		
		</div>



@endsection
@section('script')
	<script type="text/javascript">
<!--

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