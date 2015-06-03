<!DOCTYPE html>
<html lang="en" >
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
    <link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,800italic,400,600,800">
		{{ Asset::styles() }}
		@yield('additional_css')
	</head>

	<body>
  <div id='wrapper'>
    <div id='content' style='margin:20px;padding:10px;min-height:940px;'>
      @yield('content')
    </div>
  </div>
  {{ Asset::scripts() }}
	@yield('javascript_footer')
	</body>
</html>

