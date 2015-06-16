@extends('layout.dmeadmin.default')
@section('active_members_class')
active
@endsection
@section('content')
	<div id="page-wrapper" class="page-wrapper-cls">
		
			
            <div id="page-inner">
				<div class="adduserbar-mobileview">
					<a href="javascript:void(0)">
						<span></span>
						<small class="bars">
							<strong class="icon-bar1"></strong>
							<strong class="icon-bar2"></strong>
							<strong class="icon-bar3"></strong>
						</small>
					</a>
				</div>
				<!-- Member List Start -->
				<div class="member-main-tab">
					<div class="tabs-member">
						<ul>
							<li class="active"><a href="/admin/members/detail/{{ $record->hash }}">Details<span></span></a></li>
							<li><a href="/admin/members/properties/{{ $record->hash }}">Properties</a></li>
						</ul>
					</div>
					<div class="main-member-down">
						<a class="edit-List" href="/admin/members/edit/{{ $record->hash }}"><img src="/images/edit.png"></a>
						<div class="list-top">
							<a class="list-Logo" href="#">
							<?php if($record->company_logo){ 
										$company_logo = ImgProxy::link($record->company_logo, 180, 0);
								 } else{
										$company_logo = "/images/upload-logo.png";
								 }
								 ?>
								<img src="{{ $company_logo }}" alt="logo">
							
							</a>
							<div class="list-detail-Member">
								<a href="#">{{ $record->company_name }}</a>
								<label>{{ $record->company_code }}</label>
								<span>{{ $record->company_address }}, {{ $record->company_city }}, {{ $record->company_state }}, {{ $record->company_zipcode }}, {{ $record->country_name }}</span>
							</div>
						</div>
						<div class="multy-col">
							<div class="member-row">
								<span>Phone</span>
								<label>{{ $record->company_phone }}</label>
							</div>
							<div class="member-row">
								<span>Fax</span>
								<label>{{ $record->company_fax }}</label>
							</div>
						</div>
						<div class="member-row">
							<span>Email</span>
							<label>{{ $record->company_email }}</label>
						</div>
						<div class="member-row">
							<span>Website</span>
							<label>{{ $record->company_website }}</label>
						</div>
						<div class="member-row">
							<span>Description</span>
							<font>{{ $record->company_description }}</font>
						</div>
					</div>
				</div>
				<!-- Member List End -->
				<!-- add user bar-->
				<div class="adduserbar-container hiding">
					<div class="adduser-button"><a href="javascript:void(0);">Add New User</a></div>
					<div class="users-listing">
						<h1>Users</h1>
						<ul>
							<li>
								<div class="users-con">
									<span class="userimg"><img src="/images/userimg1.jpg" alt=""></span>
									<span class="user-detail">
										<a href="#">Manager</a>
										<small>Dr. Sarah Jenny</small>
									</span>
								</div>
							</li>
							<li>
								<div class="users-con">
									<span class="userimg"><img src="/images/userimg2.jpg" alt=""></span>
									<span class="user-detail">
										<a href="#">Manager</a>
										<small>Dr. Sarah Jenny</small>
									</span>
								</div>
							</li>
							<li>
								<div class="users-con">
									<span class="userimg"><img src="/images/userimg3.jpg" alt=""></span>
									<span class="user-detail">
										<a href="#">Manager</a>
										<small>Dr. Sarah Jenny</small>
									</span>
								</div>
							</li>
							<li>
								<div class="users-con">
									<span class="userimg"><img src="/images/userimg1.jpg" alt=""></span>
									<span class="user-detail">
										<a href="#">Manager</a>
										<small>Dr. Sarah Jenny</small>
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			<!-- add user bar end-->
            <!-- /. PAGE INNER  -->
			</div>
		

	
	</div>



@endsection
@section('script')
	<script type="text/javascript">


	</script>
@endsection