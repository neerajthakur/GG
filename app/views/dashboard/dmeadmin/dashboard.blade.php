@extends('layout.dmeadmin.default')
@section('active_dashboard_class')
active
@endsection
@section('content')
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
							<small>ADD NEW MEMBERS</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="#" class="button button--aylen button--border-thin button--round-s">
							<span class="addnewauditor-icon"></span>
							<small>ADD NEW AUDITORS</small>
						</a>
					</div>
					<div class="quickstats-inner">
						<a href="/admin/users/add" class="button button--aylen button--border-thin button--round-s">
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
@endsection