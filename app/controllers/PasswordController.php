<?php
	class PasswordController extends BaseController {
		public function remind(){
			if (Auth::check()){
				return Redirect::to("/home");
			}else{
				return View::make('password.remind');
			}
		}

		public function request(){
			$rules = array(
						'email' => 'required|email'
					);

			$messages = array(
						'email.required' => 'The email field is required.',
						'email.email' => 'Please enter a valid email address.'
					);
			$validation = Validator::make(Input::all(), $rules, $messages);
			if($validation->fails()){
				return Redirect::to('/password/reset')->withErrors($validation)->withInput();
			}
			$credentials = array('email' => Input::get('email'));
			$query = DB::table('user')->select('id')->where('email',Input::get('email'))->first();
			if($query){

				$response = Password::remind($credentials, function($message) {
					$message->subject('Click on the link below to reset your password.');
				});

				switch ($response) {
					case Password::INVALID_USER:
						return Redirect::back()->with('result_warning', Lang::get($response));

					case Password::REMINDER_SENT:
						return Redirect::back()->with('result_success', Lang::get($response));
				}
				//$result = Password::remind(Input::only('email'));

				/*echo "<pre>";
				print_r(Lang::get($result));
				print_r($result);
				die("Here");*/
				
				/*Mail::send('emails.auth.reminder', $user, function($message) use ($user){
					  $message->from('admin@site.com', 'Site Admin');
					  $message->to($user['email'], $user['name'])->subject('Welcome to Hydra!');
					});*/
				return Redirect::to('/password/reset')->with('result_success', 'An email has been sent with password reset link.');
			}else{
				return Redirect::to('/password/reset')->with('result_warning', 'Provided email doesn\'t seem to be regiseted with hydra.');
			}

			
		}

		public function reset($token){
			return View::make('password.reset')->with('token', $token);
		}
		public function update(){
			$rules = array(
						'email' => 'required|email',
						'password' => 'required|between:6,14',
						'password_confirmation' => 'required|between:6,14'
					);

			$messages = array(
						'email.required' => 'The email field is required.',
						'password' => 'The password field is required.',
						'password_confirmation' => 'The password confirmation field is required.'
					);
			$validation = Validator::make(Input::all(), $rules, $messages);
			if($validation->fails()){
				return Redirect::to('/password/reset/'.Input::get('token'))->withErrors($validation)->withInput();
			}
			$credentials = Input::only(
				'email', 'password', 'password_confirmation', 'token'
			);

			$response = Password::reset($credentials, function($user, $password){
				$user->password = Hash::make($password);
				$user->save();
			});
			switch ($response)			{
				case Password::INVALID_PASSWORD:
					return Redirect::to('/password/reset/'.Input::get('token'))->with('result_warning', 'Passwords do not match.')->withInput();
				case Password::INVALID_TOKEN:
					return Redirect::to('/password/reset/'.Input::get('token'))->with('result_warning', 'Invalid token.')->withInput();
				case Password::INVALID_USER:
					return Redirect::to('/password/reset/'.Input::get('token'))->with('result_warning', 'User not found.')->withInput();
				case Password::PASSWORD_RESET:
					return Redirect::to('/')->with('account_success', 'Password successfully changed.');
			}
		}

		public function changePassword() {
			return View::make('password.changePassword');
		}

		public function changePasswordPost($accountHash = null) {
			$rules = array(
						'old_password' => 'required',
						'new_password' => 'required|between:6,14',
						'new_password_confirmation' => 'required|between:6,14'
					);

			$messages = array(
						'old_password.required' => 'The old password field is required.',
						'new_password' => 'The password field is required.',
						'new_password_confirmation' => 'The password confirmation field is required.'
					);
			$validation = Validator::make(Input::all(), $rules, $messages);
			if($validation->passes()){
				
				if(Input::get('new_password') != Input::get('new_password_confirmation')){
					return Redirect::back()->with('result_warning', 'Passwords do not match.');
				}else if(!Hash::check(Input::get('old_password'), Auth::user()->password)){
					return Redirect::back()->with('result_warning', 'Old password does not match.');
				}else{
					User::updateNewPassword(Input::get('new_password'));
					return Redirect::to('/logout')->with('account_success', 'Your password has been successfully changed. Please login using new password.');
				}
			}
			return Redirect::back()->withInput()->withErrors($validation);
		}
	}