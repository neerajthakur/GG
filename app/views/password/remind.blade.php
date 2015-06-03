@extends('layout.password')
@section('content')
<h5>Please enter your registered email-id.</h5>
{{ Form::open(array('route' => 'password.request')) }}
	<div class="form-group">
		
		{{ Form::text('email', Input::old('email'), array('class'=>'form-control','placeholder'=>'Email')) }}
	</div>
 
  <div class="form-group">
		<button type="submit" id="login-btn" class="btn btn-primary btn-block">Submit <i class="fa fa-play-circle"></i></button>
	</div>
	<div style = "clear:both"></div>
 
{{ Form::close() }}
@endsection