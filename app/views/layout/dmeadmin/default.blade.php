<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="/images/favicon.png"/>
    <title>Green Globe Solutions</title>
    
	{{ HTML::style('css/bootstrap.css') }}
	{{ HTML::style('css/font-awesome.css') }}
   
	{{ HTML::style('css/style.css') }} 
	{{ HTML::style('css/buttons.css') }}
	

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
		<div class="topbar">
			<div class="col-md-4 col-sm-4">
				<div class="logomain"><a href="#"><img src="/images/logo.png" alt=""></a></div>
			</div>
			<div class="col-md-8 col-sm-8">
			<div class="usernamepanel">
					
					<?php if(Auth::User()->image){
						$u_image = ImgProxy::link(Auth::User()->image, 39, 39);
					}else{
						 $u_image = ImgProxy::link("/images/usericon.png", 39, 39);
					} ?>
					<img src="{{ $u_image }}" alt="">
					<div class="userstatus">
						<span>Welcome!</span>
						<strong>{{ Auth::User()->name }}</strong>
						<strong><?php if(Auth::User()->image){ echo "here"; }else{} ?>
					</div>
					<div class="droplinks">
						<span class="icon"></span>
						<div class="menu hide">
							<ul class="menu-wrapper">
								<li class="logout"><a href="/logout"><font></font>Logout</a></li>	
							</ul>
						</div>
					</div>
					
				</div>

				<div class="notificationpanel">
					<span></span>
					<a href="#">4</a>
				</div>
				<div class="searchpanel">
					<input type="text" placeholder="Search...">
					<span></span>
				</div>
				
				
			</div>
		</div>
         <nav class="navbar navbar-default navbar-cls-top " role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
				<div class="logo-nav">
					<a href="#"><img src="/images/mobilelogo.png"></a>
					<!-- <span class="mobilesearch-panel"><font></font><input type="text" placeholder="Search"></span> -->
				</div>
				<div class="userprofile-mobileview">
					<a href="#"><img src="/images/profileimg.jpg" alt=""></a>
				</div>
				<div class="droplinks droplinks-mobile">
					<span class="icon"></span>
					<div class="menu hide">
						<ul class="menu-wrapper">
							<li class="logout"><a href="#"><font></font>Logout</a></li>	
						</ul>
					</div>
				</div>
                <div class="expander mobile-toggle">
					<button data-target=".sidebar-collapse" data-toggle="collapse" class=" btn-expand icon-top" type="button">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- <div class="pin">
						<div class="pin-out"><a href="#" class="pin-icon"></a></div>
					</div> -->
				</div>	
				<div class="notification-panel">
					<a href="javascript:void(0)"></a>
				</div>
				<div class="mobilesearch">
					<a href="javascript:void(0)"></a>
				</div>
				
                <a  class="navbar-brand" href="index.html"></a>
            </div>
			<div class="searchpanel-mobile">
					<input type="text" placeholder="Search...">
					<span></span>
			</div>
        </nav>
        @include('layout/dmeadmin/navigation')
        @yield('content')
	
        
    </div>
        </div>
   
	{{ HTML::script('js/jquery-1.11.1.js') }}
	{{ HTML::script('js/bootstrap.js') }}
	{{ HTML::script('js/jquery.metisMenu.js') }}
	{{ HTML::script('js/bootstrap-select.js') }}
	{{ HTML::script('js/custom.js') }}
	{{ HTML::script('js/bootstrap-toggle.min.js') }}
	{{ HTML::script('js/jquery.form.min.js') }}
	{{ HTML::script('js/jquery.screwdefaultbuttonsV2.js') }}
	<script>
		$(function() {
			$('#toggle-one').bootstrapToggle();
		})
	</script>
	@yield('script')
</body>
</html>