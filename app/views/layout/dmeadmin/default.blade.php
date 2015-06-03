<!DOCTYPE html>
<html lang="en" ng-app="draymasterApp">
	<head>
		<title>Hydra</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
   <!-- <link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,800italic,400,600,800">-->
		{{ Asset::styles() }}
		@yield('additional_css')
		{{ HTML::script('/js/libs/jquery-1.11.1.min.js') }}
	</head>

	<body>

	<div id="wrapper">
	
		<header id="header">

			<h1 id="site-logo">
				<a href="/home">
					<img src="/img/logos/logo.png" alt="Site Logo" />
				</a>
			</h1>

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
									<a href="/admin/changePassword">
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
					<?php if(Session::get('account_role') == 'admin'){ ?>
							<li class="@yield('admin_management_class')">
								<a href="/admin/account/listing">
									<i class="contactlist"></i>
									User Management
								</a>
							</li>
							
							<!--<li class="@yield('client_activity_class')">
								<a href="#">
									<i class="activityico"></i>
									Activity
								</a>
							</li>-->
							<li class="@yield('client_schedule_class')">
								<a href="/admin/schedules/listing">
									<i class="visitschedule"></i>
									Visit Schedule
								</a>
							</li>
							
							
							<li class="@yield('manage_stores_class')">
								<a href="/admin/stores/listing">
									<i class="store"></i>
									Store Management
								</a>
							</li>
							<li class="@yield('client_report_class') dropdown">
								<a href="javascript:void(0);">
									<i class="filenewreport"></i>
									Reports Library
								</a>
								<ul class="sub-nav">
									<li class="@yield('client_report_await_class')">
										<a href="/admin/reports/listing">
											<i class="fa fa-list-ul"></i>
											Awaiting Approval
										</a>
									</li>
									<li class="@yield('client_report_approved_class')">
										<a href="/admin/approvedReports/listing">
											<i class="fa fa-list-ul"></i>
											Approved Reports
										</a>
									</li>
									
								</ul>
							</li>

							<li class="@yield('summary_report_class') dropdown">
								<a href="javascript:void(0);">
									<i class="filenewreport"></i>
									Summary Reports
								</a>
								<ul class="sub-nav">
									<li class="@yield('create_summary_report_class')">
										<a href="/admin/summary-reports/create">
											<i class="fa fa-list-ul"></i>
											Create New Report
										</a>
									</li>
									<li class="@yield('summary_reports_listing_class')">
										<a href="/admin/summary-reports/listing">
											<i class="fa fa-list-ul"></i>
											Reports
										</a>
									</li>
									
								</ul>
							</li>

							<li class="@yield('client_tnf_class')">
								<a href="/admin/databank/listing">
									<i class="branddata"></i>
									Data Bank
								</a>
							</li>
							<li class="@yield('client_templates_class')">
								<a href="/admin/reportTemplates/listing">
									<i class="reporttemplate"></i>
									Report Templates
								</a>
							</li>
							<li class="@yield('client_invoicemc_class') dropdown">
								<a href="javascript:void(0);">
									<i class="filenewreport"></i>
									Invoices MC
								</a>
								<ul class="sub-nav">
									<li class="@yield('client_invoicemc_await_class')">
										<a href="/admin/invoicemc/listing">
											<i class="fa fa-list-ul"></i>
											Awaiting Approval
										</a>
									</li>
									<li class="@yield('client_invoicemc_approved_class')">
										<a href="/admin/invoicemc/paid/listing">
											<i class="fa fa-list-ul"></i>
											Processed Invoices
										</a>
									</li>
									
								</ul>
							</li>
							<li class="@yield('client_invoiceclient_class') dropdown">
								<a href="javascript:void(0);">
									<i class="filenewreport"></i>
									Invoices Client
								</a>
								<ul class="sub-nav">
									<li class="@yield('client_invoiceclient_await_class')">
										<a href="/admin/invoiceclient/create">
											<i class="fa fa-list-ul"></i>
											Produce Invoices
										</a>
									</li>
									<li class="@yield('client_invoiceclient_approved_class')">
										<a href="/admin/invoiceclient/listing">
											<i class="fa fa-list-ul"></i>
											Reports Invoiced
										</a>
									</li>
									
								</ul>
							</li>
							<li class="@yield('mc_client_assoc_add_class')">
								<a href="/admin/mc-client-assoc/manage">
									<i class="contactlist"></i>
									MC-Client Assoc
								</a>
								
							</li>
							<li class="@yield('countries_regions_manage_class') dropdown" >
								<a href="javascript:void(0);">
									<i class = "store"></i>
									Manage Misc.
								</a>
								<ul class="sub-nav">
									<li class="@yield('countries_manage_class')">
										<a href="/admin/countries/manage">
											<i class = "fa fa-list-ul"></i>
											Manage Countries
										</a>
									</li>
									<li class="@yield('regions_manage_class')">
										<a href="/admin/regions/manage">
											<i class = "fa fa-list-ul"></i>
											Manage Regions
										</a>
									</li>
									<li class="@yield('chains_manage_class')">
										<a href="/admin/chains/manage">
											<i class = "fa fa-list-ul"></i>
											Manage Chains
										</a>
									</li>
								</ul>
							</li>

							
							<!--<li class="@yield('client_placeholders_class')">
								<a href="#">
									<i class="reportlib"></i>
									Placeholders
								</a>
							</li>-->
					<?php 
						}else if(Session::get('account_role') == 'supervisor'){
					?>
							<li class="@yield('admin_management_class')">
								<a href="/supervisor/account/listing">
									<i class="contactlist"></i>
									MC Management
								</a>
							</li>
							
							
							<li class="@yield('client_schedule_class')">
								<a href="/supervisor/schedules/listing">
									<i class="visitschedule"></i>
									Visit Schedule
								</a>
							</li>
							
							
							<li class="@yield('manage_stores_class')">
								<a href="/supervisor/stores/listing">
									<i class="store"></i>
									Store Management
								</a>
							</li>
							<li class="@yield('client_report_class') dropdown">
								<a href="javascript:void(0);">
									<i class="filenewreport"></i>
									Reports Library
								</a>
								<ul class="sub-nav">
									<li class="@yield('client_report_await_class')">
										<a href="/admin/reports/listing">
											<i class="fa fa-list-ul"></i>
											Awaiting Approval
										</a>
									</li>
									<li class="@yield('client_report_approved_class')">
										<a href="/admin/approvedReports/listing">
											<i class="fa fa-list-ul"></i>
											Approved Reports
										</a>
									</li>
									
								</ul>
							</li>
							
							<li class="@yield('client_templates_class')">
								<a href="/admin/reportTemplates/listing">
									<i class="reporttemplate"></i>
									Report Templates
								</a>
							</li>
							<li class="@yield('client_tnf_class')">
								<a href="/admin/databank/listing">
									<i class="branddata"></i>
									Data Bank
								</a>
							</li>
							<li class="@yield('client_processing_class')">
								<a href="#">
									<i class="creatsummaries"></i>
									Data Processing
								</a>
							</li>
							
							<li class="@yield('client_placeholders_class')">
								<a href="#">
									<i class="reportlib"></i>
									Placeholders
								</a>
							</li>
					<?php
						}	
					?>
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