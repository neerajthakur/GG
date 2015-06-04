<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	public function getRememberToken(){
		return $this->remember_token;
	}

	public function setRememberToken($value){
		$this->remember_token = $value;
	}

	public function getRememberTokenName(){
		return 'remember_token';
	}
	
	/**
	 * allow for mass injection via eloquent
	 * @var array
	 * 
	 */
	protected $fillable = array('first_name', 'last_name');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	public static $settings_rules = array(
		'first_name' => 'required',
		'last_name'  => 'required',
	    	'photo'	=>	'max:1024|image'
	);
	public static $password_rules = array(
		'old-password' 		=> 	'required',
	    	'new-password-1' 	=> 	'required|different:old-password|min:6',
	    	'new-password-2'	=>	'required|same:new-password-1',
	);
	public static	$messages = array(
			'first_name.required' => 'First name is required.',
			'old-password.required' => 'Password is required.',
			'new-password-1.required' => 'New password is required.',
	    		'new-password-1.different' => 'The new password and old password must be different.',
	    		'new-password-1.min' => 'The new password must be at least 6 characters.',
	    		'new-password-2.required' => 'Confirm password is required.',
	    		'new-password-2.same' 	=> 'Password and confirm password must match.',
		);
	public $errors;

	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}

	public function errors()
	{
		return $this->errors;
	}
  
	public function updateUser($input){
		foreach($input as $prop => $val){
			if($prop == '_token' || $prop == 'photo'){}
      else
      {
				$this->{$prop} = $val;		
			}
		}
		$this->save();	
		return Auth::login($this);	
	}
  
	public function updatePassword($input){
		$matches = $this->checkPassword($input['old-password'], $this->getAuthPassword());	
		if($matches){
			$this->saveNewPassword($input['new-password-1']);
			return true;
		}
    else
    {
			return false;
		}
	}
  
	public function checkPassword($current, $authorized){
		 
		if(Hash::check($current, $authorized))
		{
			return true;
		}
    else
    {
			return false;
		}
	}
  
	public function saveNewPassword($new_pass){
		$this->password = Hash::make($new_pass);
		$this->save();	
	}
  
	public static function updateUserPhoto($file, $path = 'img/avatars/')
	{
		if($file){
			$filename = Auth::user()->hash; 
			$file->move($path, $filename);
		}
	}
	public static function createUser($input, $account_id = null){
		$user = new User();
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email = $input['email'];
		$password = uniqid();
		$user->password = Hash::make($password);
		$user->hash	 = md5(uniqid());

		$imageFile = Input::file('image');
		$destinationPath = 'uploads/profile_images/';
		$filename = "";
		if($imageFile != ""){
			$filename			= time().$imageFile->getClientOriginalName();
			$mime_type			= $imageFile->getMimeType();
			$extension				= $imageFile->getClientOriginalExtension();
			$upload_success		= $imageFile->move($destinationPath, $filename);
		}
		$query = DB::table('usertype')->select('id')->where('usertype', $input['usertype'])->first();
		if($query){
			$usertype_id = $query->id;
		}else{
			$usertype_id = 2;
		}
		$user->image = $filename;
		$user->usertype_id = $usertype_id;
		$user->save();
		$user = array(
			'email'=>$input['email'],
			'first_name'=>$input['first_name'],
			'name'=>$input['first_name']." ".$input['last_name'],
			'password' => $password
		);

		

		// use Mail::send function to send email passing the data and using the $user variable in the closure
		Mail::send('emails.signup', $user, function($message) use ($user){
		  $message->from('admin@site.com', 'Site Admin');
		  $message->to($user['email'], $user['name'])->subject('Welcome to Hydra!');
		});
	}

	public static function getAll($orderBy, $order){
		$query = DB::table('user')->select('user.id','user.hash','user.first_name','user.last_name','user.email','user.status','user.created_at','usertype.usertype as usertype')->leftJoin('usertype','user.usertype_id','=','usertype.id');
		
		if(trim(Input::get('search')) != ""){
			$search = '%'.trim(Input::get('search')).'%';
			$query = $query->where(function($query) use($search){
				$query->where('user.first_name','like', $search)
					->orWhere('user.last_name','like', $search)
					->orWhere('user.email','like', $search);

			});
		}
		$query = $query->orderBy($orderBy, $order);
		
		
		$accounts = $query->get();
		$accountsArray = array();
		foreach($accounts as $key=>$value){
			foreach($value as $key1 => $value1){
				if($key1 == "created_at"){
					$accountsArray[$key][$key1] = date("d-M-Y", strtotime($value1));
				}else{
					$accountsArray[$key][$key1] = $value1;
				}
			}
		}
		return $accountsArray;
	}

	public static function accountDetail($accountHash = null){
		//$query = DB::table('user')->select('id','hash','first_name','last_name','status','role')->where('hash', $accountHash)->first();
		$query = DB::table('user')->select('user.id','usertype_id','user.image', 'user.hash','user.first_name','user.last_name','user.email','user.status','user.created_at','usertype.usertype as usertype')->leftJoin('usertype','user.usertype_id','=','usertype.id')->where('hash', $accountHash)->first();
		return $query;
	}

	public static function changeStatus($accountHash = null){
		$result = false;
		$query = DB::table('user')->select('id','hash','status')->where('hash', $accountHash)->first();
		if($query != null){
			$status = $query->status;
			if($query->status == 1){
				$newStatus = 0;
			}else{
				$newStatus = 1;
			}
			DB::table('user')->where('id', $query->id)->update(array('status' => $newStatus));
			$result = true;
		}
		return $result;
	}
			
	public static function getClientsAll($email = false){
		$clients = DB::table('user')->select('user.id','user.hash','user.first_name','user.last_name','user.email','user.status','user.created_at','usertype.usertype as usertype')->leftJoin('usertype','user.usertype_id','=','usertype.id')->where("user.usertype_id","3")->where("user.status",'1')->orderBy('user.first_name', 'asc')->get();
		$clientsArray = array();
		foreach($clients as $key=>$value){
			if($email){
				$clientsArray[$value->id] = $value->first_name." ".$value->last_name." [".$value->email."]";
			}else{
				$clientsArray[$value->id] = $value->first_name." ".$value->last_name;
			}
		}
		return $clientsArray;
	}

	public static function getMerchandiseAll(){
		$mcs = DB::table('user')->select('user.id','user.hash','user.first_name','user.last_name','user.email','user.status','user.created_at','usertype.usertype as usertype')->leftJoin('usertype','user.usertype_id','=','usertype.id')->where("user.usertype_id","2")->where("user.status",'1')->orderBy("user.first_name","asc")->orderBy("user.last_name","asc")->get();
		$mcsArray = array();
		foreach($mcs as $key=>$value){
			$mcsArray[$value->id] = $value->first_name." ".$value->last_name." [".$value->email."]";
		}
		return $mcsArray;
	}

	public static function updateNewPassword($password = null){
		$user = new User();
		$user = User::find(Auth::user()->id);
		$user->password = Hash::make($password);
		$user->save();
	}

	//Get user by id
	public static function getUserById($id){
		$store = DB::table('user')->where("id",$id)->first();
		return $store;
	}

	//Get user by id
	public static function getUserByHash($id){
		$user = DB::table('user')->where("hash", $hash)->first();
		return $user;
	}
	// edit user profile
	public static function saveEditProfile($input){
		$user_id = Auth::user()->id;
		$first_name = $input['first_name'];
		$last_name = $input['last_name'];
		$phone = $input['phone'];
		$imageFile = Input::file('image');
		$destinationPath = 'uploads/profile_images/';
		$filename = "";
		if($imageFile != ""){
			$filename				= time().$imageFile->getClientOriginalName();
			$mime_type			= $imageFile->getMimeType();
			$extension				= $imageFile->getClientOriginalExtension();
			$upload_success		= $imageFile->move($destinationPath, $filename);
			$ids = DB::table('user')->where('id', $user_id)->update(array('first_name' => $first_name, 'last_name'=>$last_name, 'phone'=>$phone, 'image'=>$filename));
		} else {		
			$ids = DB::table('user')->where('id', $user_id)->update(array('first_name' => $first_name, 'last_name'=>$last_name, 'phone'=>$phone));
		}
		return $user_id;
	}
	
	//change password by admin
	public static function changePassword($password = null, $hash = null){
		$user = new User();
		$userInfo = User::accountDetail($hash);
		$user = User::find($userInfo->id);
		$user->password = Hash::make($password);
		$user->save();
	}

	public static function sendLoginInfo($hash){
		$user = new User();
		$userInfo = User::accountDetail($hash);
		$user = User::find($userInfo->id);
		$password = uniqid();
		$user->password = Hash::make($password);
		$user->save();

		$user = array(
			'email'=>$userInfo->email,
			'first_name'=>$userInfo->first_name,
			'name'=>$userInfo->first_name." ".$userInfo->last_name,
			'password' => $password
		);

		

		// use Mail::send function to send email passing the data and using the $user variable in the closure
		Mail::send('emails.signup', $user, function($message) use ($user){
		  $message->from('admin@site.com', 'Site Admin');
		  $message->to($user['email'], $user['name'])->subject('Welcome to Hydra!');
		});
	}

	public static function editUser($input){
		$user = new User();
		$userInfo = User::accountDetail($input['hash']);
		$user = User::find($userInfo->id);
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email = $input['email'];
		$user->save();
	}
}