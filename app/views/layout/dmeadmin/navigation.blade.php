 <nav  class="navbar-default navbar-side hiding" id="mod-navigation">
	<div class="">			
		<div class="activity-system">
			<div class="col-md-12 padding">
				<ul>
					<li class=""><a href="/admin/dashboard" class="@yield('active_dashboard_class')"><span class="dashboard"></span><small>Dashboard</small></a></li>

					<li class=""><a href="/admin/members/list" class="@yield('active_members_class')"><span class="members"></span><small>Members</small></a></li>

					<li class="auditiors-main"><a href="projects.html" class="@yield('active_auditors_class')"><span class = "auditors"></span><small>Auditors</small></a></li>

					<li class="user-main"><a href="/admin/users/add" class="@yield('active_users_class')"><span class = "users"></span><small>Users</small></a></li>

					<li class="standards-main" class="@yield('active_standards_class')"><a href="projects.html"><span class = "standards"></span><small>Standards</small></a></li>

					<li class=""><a href="milestone.html" class="@yield('active_settins_class')"><span class = "settings"></span><small>Settings</small></a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>      