@extends((Session::get('account_role') == 'admin') ? 'layout.dmeadmin.default' : 'layout.default')

@section('admin_management_class')
  active
@endsection

@section('content_header')
  Change Password
@endsection

@section('content')
 <div>
	
	<div class="row">
		<div class="col-md-8 col-sm-7">
			<h3 class = "btn-panel">&nbsp;</h3>
			<!-- error handling -->
			
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
			<?php if(Session::has('result_warning')): ?>
			<div class="alert alert-danger">
					<p>{{ Session::get('result_warning') }}</p>
			</div>
		<?php endif; ?>
			{{ Form::open(array('id'=>'login-form','class'=>'form')) }}

			

			
			<div class="form-group">
				{{ Form::label('old_password', 'Old Password') }}
				{{ Form::password('old_password', array('class'=>'form-control','placeholder'=>'Old Password', 'autocomplete'=>'off')) }}
			</div>
			<div class="form-group">
				{{ Form::label('new_password', 'New Password') }}
				{{ Form::password('new_password', array('class'=>'form-control','placeholder'=>'New Password')) }}
			</div>
			<div class="form-group">
				{{ Form::label('new_password_confirmation', 'Confirm New Password') }}
				{{ Form::password('new_password_confirmation', array('class'=>'form-control','placeholder'=>'Confirm New Password')) }}
			</div>
			
			

			<div class="form-group">
				<button type="submit" id="login-btn" class="btn btn-primary btn-block">Change Password &nbsp; <i class="fa fa-play-circle"></i></button>
			</div>

		{{ Form::close() }}
		</div>
		
	</div>
	
</div>
@endsection