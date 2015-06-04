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
					<img src="/images/profileimg.jpg" alt="">
					<div class="userstatus">
						<span>Good Morning</span>
						<strong>Birte</strong>
					</div>
					<a href="#"></a>
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
				
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
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
        <!-- /. NAV TOP  -->
	
        <nav  class="navbar-default navbar-side" role="navigation">
            <div class="sidebar-collapse">			
				<div class="activity-system">
					<div class="col-md-12 padding">
						<ul>
							<li class=""><a href="index.html" class="@yield('active_dashboard_class')"><span class="dashboard"></span><small>Dashboard</small></a></li>

							<li class=""><a href="tasks.html" class="@yield('active_members_class')"><span class="members"></span><small>Members</small></a></li>

							<li class="standards-main" class="@yield('active_standards_class')"><a href="projects.html"><span class="standards"></span><small>Standards</small></a></li>

							<li class="auditiors-main"><a href="projects.html" class="@yield('active_auditors_class')"><span class="auditors"></span><small>auditors</small></a></li>

							<li class=""><a href="milestone.html" class="@yield('active_settins_class')"><span class="settings"></span><small>Settings</small></a></li>
						</ul>
					</div>
				</div>
				
            </div>
		
        </nav>
        <!-- /. SIDEBAR MENU (navbar-side) -->
        <div id="page-wrapper" class="page-wrapper-cls">
			
            <div id="page-inner">
              
			  <div class="dashboard-options">
				<div class="quickstats-main">
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="members-icon"></span>
							<strong>520</strong>
							<small>members</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="auditors-icon"></span>
							<strong>50</strong>
							<small>AUDITORS</small>
						</a>
					</div>
					<div class="quickstats-heading">
						<span>Quick Stats</span>
					</div>
				</div>
				<div class="quickstats-main">
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="progressaudits-icon"></span>
							<small>IN PROGRESS AUDITS</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="pendingaudits-icon"></span>
							<small>PENDING<br> AUDITS</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="completedaudits-icon"></span>
							<small>COMPLETED AUDITS</small>
						</a>
					</div>
					<div class="quickstats-heading">
						<span  class="audits-heading">Audits</span>
					</div>
				</div>
				<div class="quickstats-main">
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="addnewmembers-icon"></span>
							<small>add new members</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="addnewauditor-icon"></span>
							<small>ADD NEW AUDITOR</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="addnewauditor-icon"></span>
							<small>ADD NEW <br>USER</small>
						</a>
					</div>
					<div class="quickstats-heading">
						<span class="heading">New</span>
					</div>
				</div>
				<div class="quickstats-main border">
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="managestandards-icon"></span>
							<small>MANAGE STANDARDS</small>
						</a>
					</div>
					<div class="quickstats-heading">
						<span class="standards-heading">Standards</span>
					</div>
				</div>
			  </div>
				
            
        </div>
		
		</div>
	
        
    </div>
        </div>
   
	{{ HTML::script('js/jquery-1.11.1.js') }}
	{{ HTML::script('js/bootstrap.js') }}
	{{ HTML::script('js/jquery.metisMenu.js') }}
	{{ HTML::script('js/bootstrap-select.js') }}   
</body>
</html>