<?php

class LoginController extends BaseController {
	public function index(){
		
		if (Auth::check()){
			if(Session::get('account_role') == 'client'){
				return Redirect::to('/dashboard');
			}elseif(Session::get('account_role') == 'merchandise'){
				return Redirect::to('/dashboard');
			}elseif(Session::get('account_role') == 'admin'){
				return Redirect::to('/admin/dashboard');
			}elseif(Session::get('account_role') == 'supervisor'){
				return Redirect::to('/admin/dashboard');
			}
		
		}else{
			return View::make('login.index');
		}
	}
	public function post(){
		$rules = array(
						'login-email' => 'required|email',
						'login-password' => 'required'
					);

		$messages = array(
						'login-email.required' => 'The email field is required.',
						'login-password.required' => 'The password field is required'
					);

		$validation = Validator::make(Input::all(), $rules, $messages);

		if($validation->fails()){
			return Redirect::to('/')->withErrors($validation)->withInput();
		}

		$user = array(
			'email' => Input::get('login-email'),
			'password' => Input::get('login-password'),
			'status' => '1'
		);

		$rememberMe = Input::get('remember-me') ? true : false;
		if(Auth::attempt($user, $rememberMe)){
			$usertype = Usertype::find(Auth::user()->usertype_id); 
			if($usertype->usertype == "client" || $usertype->usertype == "merchandise"){
				Session::put('account_role',$usertype->usertype);
				return Redirect::to('/dashboard');
			}else{
				Auth::logout();
				return Redirect::to('/')->withInput()->with('login_error', 'Your are not authorized.');
			}
		}
		return Redirect::to('/')->withInput()->with('login_error', 'Incorrect username or password.');

		
	}

	public function logout(){
		$redirect = "/";
		if(Session::get('account_role') == 'admin' || Session::get('account_role') == 'supervisor' ){
			$redirect = "/admin";
			
		}
		Session::forget('account_role');
		Auth::logout();
		return Redirect::to($redirect);
	}

	//Admin login page
	public function adminLogin(){
		if (Auth::check()){
			return Redirect::to("/admin/dashboard");
		}else{
		  return View::make('login.dmeadmin.login');
		}
	}

	public function adminLoginPost(){
		$rules = array(
					'login-email' => 'required|email',
					'login-password' => 'required'
				);

		$messages = array(
						'login-email.required' => 'The email field is required.',
						'login-password.required' => 'The password field is required'
					);

		$validation = Validator::make(Input::all(), $rules, $messages);

		if($validation->fails()){
			return Redirect::to('/admin')->withErrors($validation)->withInput();
		}

		$user = array(
					'email' => Input::get('login-email'),
					'password' => Input::get('login-password'),
					'status' => '1'
				);
		$rememberMe = Input::get('remember-me') ? true : false;
		if(Auth::attempt($user, $rememberMe)){
			$usertype = Usertype::find(Auth::user()->usertype_id); 
			if($usertype->usertype == "admin"){
				Session::put('account_role',$usertype->usertype);
				return Redirect::to('/admin/dashboard');
			}else{
				Auth::logout();
				return Redirect::to('/admin')->withInput()->with('login_error', 'Your are not authorized.');
			}
		}
		return Redirect::to('/admin')->withInput()->with('login_error', 'Incorrect username or password.');
	}
}