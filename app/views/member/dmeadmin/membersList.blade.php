@extends('layout.dmeadmin.default')
@section('active_members_class')
active
@endsection
@section('content')
	<div id="page-wrapper" class="page-wrapper-cls">
		
			
            <div id="page-inner">
				<!-- Member List Start -->
				<div class="add-more-Member">
							<a href="/admin/members/add"><span></span>Add New Member</a>
						</div>
				<div class="member-main">
				<?php 
				if(count($members) > 0){
					foreach($members as $key => $value){
						$totalPropertise = Property::getProperties($value->id, $count = true);
						$totalUsers = User::getMemberUsers($value->id, $count = true);
						$mainUser = User::getManagerUser($value->id);
				?>
						
						<div class="memLIstOut">
							<a href="/admin/members/edit/{{ $value->hash }}" class="edit-List"><img src="/images/edit.png"></a>
							<div class="list-top">
								<a href="/admin/members/detail/{{ $value->hash }}" class="list-Logo">
								<?php if($value->company_logo){ 
										$company_logo = ImgProxy::link($value->company_logo, 180, 0);
								 } else{
										$company_logo = "/images/upload-logo.png";
								 }
								 ?>
								<img src="{{ $company_logo }}" alt="logo"></a>
								<div class="list-detail-Member">
									<a href="/admin/members/detail/{{ $value->hash }}">{{ $value->company_name }}</a>
									<label>{{ $value->company_code }}</label>
									
									<span>{{ $value->company_address}}, {{ $value->company_city }}, {{ $value->company_state}}, {{ $value->company_zipcode }}, {{ $value->country_name }} </span>
								</div>
							</div>
							<div class="list-bottom">
								<a class="user-listImage">
								<?php 
									$user_image = "/images/usericon.png";
									if($mainUser){ 
										if($mainUser->image){
											$user_image = ImgProxy::link($mainUser->image, 128, 128);
										}
									 }
								?>
								<img src="{{ $user_image }}">
								
								</a>
								<div class="user-detail-List">
									<span>Company Manager</span>
									<?php 
										if($mainUser){ 
									?>
											<a href="#">{{ $mainUser->name }}</a>
											<!--<label>Quality & Training Manager</label>-->
											<font>{{ $mainUser->email }}</font>
									<?php
										}else{
									?>
											<a href="#">Not assigned yet</a>
											<label>&nbsp;</label>
											<font>&nbsp;</font>
									<?php
										}
									?>
									
								</div>
								<div class="user-links">
									<ul>
										<li class="propertiesLink">
										<?php
											$propertise_link = "";
											if($totalPropertise > 0){ 
												$propertise_link = "/admin/members/properties/".$value->hash; 
											} 
										?>
										<a href="{{ $propertise_link }}"><span></span>Propertise #{{ $totalPropertise }}</a></li>
										<li class="activeLink"><a href="#"><span></span>Active Audits #0</a></li>
										<li class="usersLink"><a href="#"><span></span>Users #{{ $totalUsers }}</a></li>
									</ul>
								</div>
							</div>

						</div>
				<?php
					}
				}
				?>
					
				</div>
				<!-- Member List End -->

            <!-- /. PAGE INNER  -->
			</div>
		

	
	</div>



@endsection
@section('script')
	<script type="text/javascript">


	</script>
@endsection