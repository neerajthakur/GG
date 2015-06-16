<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		Hi {{ $first_name }},
		<h2>Welcome to Hydra</h2>

		<div>
			Your sign up details are below:
		</div>
		<div>Email - {{ $email }}</div>
		<div>Password - {{ $password }} </div>
		<div>Click <a href="<?php echo URL::to('/') ?>">here</a> to login.</div>
	</body>
</html>