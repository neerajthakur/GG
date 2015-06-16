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
				
			<?php if(Session::has('account_success')): ?>
			<div class="alert alert-success">
					<p>{{ Session::get('account_success') }}</p>
			</div>
		<?php endif; ?>
			  </div>
			
			<div class="adduserform-main upload-logo-panel company-panel">
				<div class="uploadphoto-panel">
				<?php
					if($action_type == 'edit'){
				?>
					<form class="form-horizontal" id="upload" enctype = "multipart/form-data" method="post" action="{{ url('upload/image/edit', $record->hash) }}" autocomplete="off">
						<span style = "position:relative;background: #d8d8d8"><label id = "output" style = "left: 14px;position: absolute;top: 14px;">
						<?php 
							if($record->company_logo != ""){
								$image_path = ImgProxy::link($record->company_logo, 0, 81);
							}else{
								$image_path = ImgProxy::link("/images/upload-logo.png", 0, 81);
							}
						?>

						<img src = "{{ $image_path }}" /></label><input type="file" name="image" id="file_browse" /> </span>
						<small>Upload Property Picture</small>
						<input type="hidden" name="_token" value="{{ csrf_token() }}" />
						<input type="hidden" name="image_type" value="company" />
						
					</form>
					
				<?php }else{ ?>
					<form class="form-horizontal" id="upload" enctype = "multipart/form-data" method="post" action="{{ url('upload/image') }}" autocomplete="off">
						<span style = "position:relative;background: #d8d8d8"><label id = "output" style = "left: 14px;position: absolute;top: 14px;"><img src = "{{ Session::get('userUploadedCompanyImageThumb', '/images/upload-logo.png'); }}" /></label><input type="file" name="image" id="file_browse" /> </span>
						<small>Upload Profile Picture</small>
						<input type="hidden" name="_token" value="{{ csrf_token() }}" />
						<input type="hidden" name="image_type" value="company" />
						
					</form>
				<?php } ?>
				</div>
				<?php
					if($action_type == 'edit'){
				?>
					{{ Form::model($record, array('action' => array('UserController@addCompanyInfoPost', $record->hash), 'method' => 'post') ) }}
					{{ Form::hidden('company_hash', $record->hash) }}
					{{ Form::hidden('company_id', $record->id) }}
				<?php }else{ ?>
					{{ Form::open(array('id'=>'login-form','class'=>'form','files'=>true)) }}
				<?php } ?>
				
				<div class="titlefield">
					<span>Company Name*</span>
					{{ Form::text('company_name', Input::old('company_name'), array('class'=>'', 'placeholder' => '')) }}
					<label class = "error_message hide">{{ $errors->first('company_name') }}</label>
					{{ Form::hidden('form_type', "member") }}

				</div>
				<div class="properOuter">
					<div class="business-type">
				<div class="forminner">
					<div class="formfield">
						<span>Company Code*</span>
						{{ Form::text('company_code', Input::old('company_code'), array('class'=>'')) }}
						<label class = "error_message hide">{{ $errors->first('company_code') }}</label>
					</div>
					<div class="formfield">
						<span>Address*</span>
						{{ Form::text('company_address', Input::old('company_address'), array('class'=>'')) }}
						<label class = "error_message hide">{{ $errors->first('company_address') }}</label>
					</div>
					<div class="formfield">
						<span>Suite#</span>
						{{ Form::text('company_suite', Input::old('company_suite'), array('class'=>'')) }}
					</div>
					<div class="formfieldDevide">
								<div class="formfield">
									<span>City*</span>
									{{ Form::text('company_city', Input::old('company_city'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('company_city') }}</label>
								</div>
								<div class="formfield">
									<span>State*</span>
									{{ Form::text('company_state', Input::old('company_state'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('company_state') }}</label>
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Country*</span>
									<div class = "select_div">
									{{ Form::select('company_country_id', $countries, null, array('class'=>'business-Type')) }}
									</div>
									<label class = "error_message hide">{{ $errors->first('company_country_id') }}</label>
									
								</div>
								<div class="formfield">
									<span>Zip-Code*</span>
									{{ Form::text('company_zipcode', Input::old('company_zipcode'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('company_zipcode') }}</label>
								</div>
							</div>
							<div class="formfieldDevide">
								<div class="formfield">
									<span>Phone*</span>
									{{ Form::text('company_phone', Input::old('company_phone'), array('class'=>'')) }}
									<label class = "error_message hide">{{ $errors->first('company_phone') }}</label>
								</div>
								<div class="formfield">
									<span>Fax</span>
									{{ Form::text('company_fax', Input::old('company_fax'), array('class'=>'')) }}
								</div>
							</div>
							<div class="formfield">
								<span>Email</span>
								{{ Form::text('company_email', Input::old('company_email'), array('class'=>'')) }}
								<label class = "error_message hide">{{ $errors->first('company_email') }}</label>
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
	<script type="text/javascript"></script>
@endsection