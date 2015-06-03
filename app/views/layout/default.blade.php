<!DOCTYPE html>
<html lang="en" ng-app="draymasterApp">
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
    <link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,800italic,400,600,800">
		{{ Asset::styles() }}
		@yield('additional_css')
		{{ HTML::script('./js/libs/jquery-1.11.1.min.js') }}
	</head>

	<body>

	<div id="wrapper">
	
		<header id="header">
			<?php
				$hydraLogoPath = $imgPath = "/img/logos/logo.png";
				$showHydraLogo = 0;
				if(Session::get('account_role') == 'client'){
					$user_id = Auth::user()->id;
					$user = User::getUserById($user_id);
					if($user->image !=''){
						$imgPath = "/uploads/profile_images/".$user->image;
						$showHydraLogo = 1;
					} 
				}
			?>
			<h1 id="site-logo">
				<a href="/home">
					<img src="<?php echo $imgPath; ?>" alt="Site Logo" style="max-height: 55px;"/>
				</a>
			</h1>
			<?php
				if($showHydraLogo){
			?>
				<h1 id="hydra-logo" style = "padding:0" class = "hidden-xs">
				<a href="/home">
					<img src="<?php echo $hydraLogoPath; ?>" alt="Hydra Logo" style="max-height: 55px;"/>
				</a>
			</h1>
			<?php
				}
			?>



			<a href="javascript:;" data-toggle="collapse" data-target=".top-bar-collapse" id="top-bar-toggle" class="navbar-toggle collapsed">
				<i class="fa fa-cog"></i>
			</a>

			<a href="javascript:;" data-toggle="collapse" data-target=".sidebar-collapse" id="sidebar-toggle" class="navbar-toggle collapsed">
				<i class="fa fa-reorder"></i>
			</a>

		</header> <!-- header -->


		<nav id="top-bar" class="collapse top-bar-collapse">

			<!--<div class="nav navbar-nav pull-right logoutpanel">
				<a href="/logout"><span></span>Logout</a>
			</div>-->
			<ul class="nav navbar-nav pull-right">
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" id="user-options-dropdown">
						<i class="fa fa-user"></i>
								{{Auth::user()->first_name}} {{Auth::user()->last_name}}
								<span class="caret"></span>
						</a>

						<ul class="dropdown-menu" role="menu">
								<!--<li>
									<a href="/profile">
										<i class="fa fa-user"></i>
										&nbsp;&nbsp;My Profile
									</a>
								</li>-->
								<li>
									<a href="/changePassword">
										<i class="fa fa-cogs"></i>
										&nbsp;&nbsp;Change Password
									</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="/account/edit">
										<i class="fa fa-cogs"></i>
										&nbsp;&nbsp;Edit Profile
									</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="/logout" id="logout">
										<i class="fa fa-sign-out"></i>
										&nbsp;&nbsp;Logout
									</a>
								</li>
						</ul>
					</li>
			</ul>
			
		</nav> <!-- /#top-bar -->


		<div id="sidebar-wrapper" class="collapse sidebar-collapse">

			<nav id="sidebar">

				<ul id="main-nav" class="open-active">
					<?php if(Session::get('account_role') == 'client'){ ?>
							
							<li class="@yield('client_schedule_class')">
								<a href="/schedules/listing">
									<i class="visitschedule"></i>
									Visit Schedule
								</a>
							</li>
							<li class="@yield('client_contact_class')">
								<a href="/contacts/listing">
									<i class="contactlist"></i>
									Contact List
								</a>
							</li>
							<li class="@yield('client_stores_class')">
								<a href="/stores/listing">
									<i class="store"></i>
									Stores
								</a>
							</li>
							<li class="@yield('client_report_class')">
								<a href="/reports/listing">
									<i class="filenewreport"></i>
									Reports Library
								</a>
							</li>
							<li class="@yield('client_invoices_class')">
								<a href="/invoiceclient/listing">
									<i class="filenewreport"></i>
									Invoices									
								</a>
							</li>
							
							<li class="@yield('client_tnf_class')">
								<a href="/databank/listing">
									<i class="branddata"></i>
									Data Bank
								</a>
							</li>
							
							
										
					<?php } else if(Session::get('account_role') == 'merchandise'){ ?>
							
							<li class="@yield('client_schedule_class')">
								<a href="/schedules/listing">
									<i class="visitschedule"></i>
									Visit Schedule
								</a>
							</li>
							<li class="@yield('client_contact_class')">
								<a href="/contacts/listing">
									<i class="contactlist"></i>
									Contact List
								</a>
							</li>
							<li class="@yield('client_stores_class')">
								<a href="/stores/listing">
									<i class="store"></i>
									Stores
								</a>
							</li>
							<li class="@yield('client_report_class') dropdown">
								<a href="javascript:void(0);">
									<i class="filenewreport"></i>
									Reports Library
								</a>
								<ul class="sub-nav">
									<li class="@yield('client_report_await_class')">
										<a href="/reports/listing">
											<i class="fa fa-list-ul"></i>
											Awaiting Approval
										</a>
									</li>
									<li class="@yield('client_report_approved_class')">
										<a href="/approvedReports/listing">
											<i class="fa fa-list-ul"></i>
											Approved Reports
										</a>
									</li>
									
								</ul>
							</li>
							<li class="@yield('client_new_report_class')">
								<a href="/reportTemplates/listing">
									<i class="filenewreport"></i>
									File New Report
								</a>
							</li>
							<li class="@yield('client_invoice_class')">
								<a href="/invoicemc/listing">
									<i class="filenewreport"></i>
									Invoices
								</a>
							</li>
							<li class="@yield('client_tnf_class')">
								<a href="/databank/listing">
									<i class="branddata"></i>
									Data Bank
								</a>
							</li>
													
					<?php } ?>
				</ul>
			</nav> <!-- #sidebar -->
		</div> <!-- /#sidebar-wrapper -->
		<div id="content">
			<?php if(Session::has('result_success')){ ?>
				<div class="alert alert-success">
						<p>{{ Session::get('result_success') }}<br/><br/></p>
				</div>
			<?php }else if(Session::get('result_failure')){ ?>
				<div class="alert alert-danger">
						<p>{{ Session::get('result_failure') }}<br/><br/></p>
				</div>
			<?php } ?>
			<div id="content-header" class="content-header2">
				
				<h1>@yield('content_header')</h1>
				
			</div> <!-- #content-header -->


			<div id="content-container">
				@yield('content')
			</div> <!-- /#content-container -->


		</div> <!-- #content -->

	</div> <!-- #wrapper -->

	<footer id="footer">
		<ul class="nav pull-right">
			<li>
				Copyright &copy; 2014, Hydra Inc.
			</li>
		</ul>
	</footer>

	{{ Asset::scripts() }}
	@yield('javascript_footer')
	</body>
</html>