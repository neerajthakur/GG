<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="images/favicon.png"/>
    <title>Green Globe</title>
    
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
<body onload="loaded(document.body)" class="login_body">
<div id="wrapper">
		<div id="login-container">
		<div id="login">

	<div id="logo">
				<img alt="Logo" src="/images/logo.png">
			</div>

	
	
		
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
		


	 


		</div>
        </div>
   
    
	{{ HTML::script('js/jquery-1.11.1.js') }}
	{{ HTML::script('js/jquery-1.11.1.js') }}

</body>
</html>