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
						<a href="#" class="add-btn-properties">Add New Property</a>
						<ul>
							<li ><a href="/admin/members/detail/{{ $records[0]->company_hash }}">Details</a></li>
							<li class="active"><a href="/admin/members/properties/{{ $records[0]->company_hash }}">Properties<span></span></a></li>
						</ul>
						
					</div>
		
					<?php
						foreach($records as $key => $record){
					?>
							<div class="main-member-down">						
								<div class="property-Image">
									<?php 
											if($record->property_image){ 
												$company_logo = ImgProxy::link($record->property_image, 657, 308);
											} else{
												$company_logo = "/images/upload-logo.png";
											}
										 ?>
										<img src="{{ $company_logo }}" alt="Image">
									
								</div>
								<div class="pro-Detail">
									<div class="hotel_name">
										<a href="#" class="Name-Property">{{ $record->property_name }}</a>
										<a class = "edit-List" href = "/admin/members/property/edit/{{ $record->hash }}"><img src="/images/edit.png"></a>								
									</div>
									<a href="#" class="start-audi">Start Auditing</a>
								</div>
								<div class="hotel-Add">
									<label>{{ $record->company_name }}</label>
									<span>{{ $record->property_address}}, {{ $record->property_city }}, {{ $record->property_state }}, {{ $record->property_zipcode }}, {{ $record->country_name }}</span>
								</div>
								<div class="multy-col">
									<div class="member-row">
										<span>Phone</span>
										<label>{{ $record->property_phone }}</label>
									</div>
									<div class="member-row">
										<span>Fax</span>
										<label>{{ $record->property_fax }}</label>
									</div>
								</div>
								<div class="member-row">
									<span>Email</span>
									<label>{{ $record->property_email }}</label>
								</div>
								<div class="member-row">
									<span>Website</span>
									<label>{{ $record->property_website }}</label>
								</div>
								<div class="multy-col">
									<div class="member-row">
										<span>Property Type</span>
										<label>{{ $record->property_type }}</label>
									</div>
									<div class="member-row">
										<span>Property Size</span>
										<label>{{ $record->property_size }}</label>
									</div>
								</div>
								<div class="member-row">
									<span>Certification Standards</span>
									<label>{{ $record->certification_standard }}</label>
								</div>
								<div class="member-row">
									<span>Description</span>
									<font>{{ $record->property_description }}</font>
								</div>
								<div class="map-Property">
									<address>{{ $record->property_address}}, {{ $record->property_city }}, {{ $record->property_state }}, {{ $record->property_zipcode }}, {{ $record->country_name }}</address>
									
								</div>
							</div>
					<?php

						}
					?>



					



					



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
									<span class="userimg"><img src = "/images/userimg1.jpg" alt=""></span>
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
		$(document).ready(function(){
  $("address").each(function(){                         
    var embed ="<iframe width='656' height='208' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $(this).text() ) +"&amp;output=embed'></iframe>";
                                $(this).html(embed);
                             
   });
});

	</script>
@endsection