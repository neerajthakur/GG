<?php

class DashboardController extends BaseController {
	public function adminDashboard(){
		return View::make("dashboard.dmeadmin.dashboard");
	}
}