@extends('layout.password')
@section('content')


{{ Form::open(array('route' => array('password.update', $token))) }}
	<div class="form-group">
		{{ Form::text('email', Input::old('email'), array('class'=>'form-control','placeholder'=>'Email')) }}
	</div>
	<div class="form-group">
		{{ Form::password('password',array('class'=>'form-control','placeholder'=>'Password')) }}
	</div>
	<div class="form-group">
	{{ Form::password('password_confirmation',array('class'=>'form-control','placeholder'=>'Password confirm')) }}
	</div>
 
  
 
  {{ Form::hidden('token', $token) }}
 
  <div class="form-group">
		<button type="submit" id="login-btn" class="btn btn-primary btn-block">Submit <i class="fa fa-play-circle"></i></button>
	</div>
	<div style = "clear:both"></div>
 
{{ Form::close() }}
@endsection