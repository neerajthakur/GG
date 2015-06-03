<!DOCTYPE html>
<html>
	<head>
		<title>DrayMaster</title>
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
		<a href="./login.html">
			<img src="./img/logos/logo-login.png" alt="Logo" />
		</a>
	</div>

	<div id="login">
		@yield('content')
	</div> <!-- /#login -->

</div> <!-- /#login-container -->

{{ Asset::scripts() }}
<script src="./js/plugins/icheck/jquery.icheck.min.js"></script>
<script src="./js/scripts/bootstrap-template/Login.js"></script>

	@yield('javascript_footer')
</body>
</html>