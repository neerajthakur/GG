<!DOCTYPE html>
<html>
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
		{{ Asset::styles() }}
    <link media="all" type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,800italic,400,600,800">
		<link media="all" rel="stylesheet" href="/js/plugins/icheck/skins/minimal/blue.css" type="text/css" />
		<link media="all" rel="stylesheet" href="/css/min/Login.min.css" type="text/css" />
	</head>
	<body>

<div id="login-container">

	<div id="logo">
			<img src="/img/logos/logo-login.png" alt="Logo" />
	</div>

	<div id="login">
	
		
		<?php if(Session::has('result_success')): ?>
			<div class="alert alert-success">
					<p>{{ Session::get('result_success') }}</p>
			</div>
		<?php endif; ?>
		<?php if(Session::has('result_warning')): ?>
			<div class="alert alert-warning">
					<p>{{ Session::get('result_warning') }}</p>
			</div>
		<?php endif; ?>
		

		<!-- error handling -->
		<?php $messages = $errors->all('<p class="alert alert-danger">:message</p>') ?>
		<?php
			foreach($messages as $msg){
				echo $msg;
			}
		?>
		@yield('content')
		<!-- login form -->
		


		

	</div> <!-- /#login -->

	<!--<a href="/account" id="signup-btn" class="btn btn-lg btn-block">
		Create an Account
	</a>-->


</div> <!-- /#login-container -->

{{ Asset::scripts() }}
<script src="./js/plugins/icheck/jquery.icheck.min.js"></script>
<script src="./js/scripts/bootstrap-template/Login.js"></script>

</body>
</html>