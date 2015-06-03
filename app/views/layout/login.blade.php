<!DOCTYPE html>
<html>
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
		{{ Asset::styles() }}
    <link media="all" type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,800italic,400,600,800">
		<link media="all" rel="stylesheet" href="./js/plugins/icheck/skins/minimal/blue.css" type="text/css" />
		<link media="all" rel="stylesheet" href="./css/min/Login.min.css" type="text/css" />
	</head>
	<body>

<div id="login-container">

	<div id="logo">
			<img src="./img/logos/logo-login.png" alt="Logo" />
	</div>

	<div id="login">

		<h3>Welcome to Hydra.</h3>
		<h5>Please sign in to get access.</h5>

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
			<div style="clear:both"></div>
		{{ Form::close() }}


		<a href="/password/reset" class="btn btn-default">Forgot Password?</a>

	</div> <!-- /#login -->

	<!--<a href="/account" id="signup-btn" class="btn btn-lg btn-block">
		Create an Account
	</a>-->


</div> <!-- /#login-container -->

{{ Asset::scripts() }}
<script src="/js/plugins/icheck/jquery.icheck.min.js"></script>
<script src="/js/scripts/bootstrap-template/Login.js"></script>

</body>
</html>