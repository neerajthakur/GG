<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="/images/favicon.png"/>
    <title>Green Globe Solutions</title>
    
	{{ HTML::style('css/bootstrap.css') }}
   
	{{ HTML::style('css/style.css') }} 

	<script>function loaded (el) { el.classList.add('loaded') }</script>
      <!-- HTML5 Shiv and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body onload="loaded(document.body)" >
    <div id="wrapper">
		<div id="login-container">
		<div id="login">
			<div id="logo">
				<img alt="Logo" src="/images/logo.png">
			</div>
			<h3>Welcome to Green Globe.</h3>
			<h5>Please sign in to get access.</h5>
			<!-- error handling -->
			<!-- login form -->
			<!-- error handling -->
			<?php $messages = $errors->all('<p class="alert alert-danger">:message</p>') ?>
			<?php
				foreach($messages as $msg){
					echo $msg;
				}
			?>
			<?php if(Session::has('login_error')): ?>
				<div class="alert alert-danger">
						<p>{{ Session::get('login_error') }}</p>
				</div>
			<?php endif; ?>

			<?php if(Session::has('account_success')): ?>
				<div class="alert alert-success">
						<p>{{ Session::get('account_success') }}</p>
				</div>
			<?php endif; ?>
		<!-- login form -->
			{{ Form::open(array('id'=>'login-form','class'=>'form')) }}
			<div class="form-group">
				{{ Form::label('login-email', 'Email') }}
				{{ Form::text('login-email', Input::old('login-email'), array('class'=>'form-control','placeholder'=>'Email')) }}
			</div>

			<div class="form-group">
				{{ Form::label('login-password', 'Password') }}
				{{ Form::password('login-password', array('class'=>'form-control','placeholder'=>'Password')) }}
			</div>
			<div class="form-group">
				<div class="checkbox">
					{{ Form::checkbox('remember-me', true, false, array('class'=>'icheck-input')) }}
					Remember Me?
				</div>
			</div>

			<div class="form-group">
				<button type="submit" id="login-btn" class="btn btn-primary btn-block">Sign In &nbsp; <i class="fa fa-play-circle"></i></button>
			</div>
			{{ Form::close() }}

		<a href="/password/reset" class="btn btn-default">Forgot Password?</a>

		</div> 
		</div>
        </div>
    {{ HTML::script('js/jquery-1.11.1.js') }}
	{{ HTML::script('js/bootstrap.js') }}
</body>
</html>