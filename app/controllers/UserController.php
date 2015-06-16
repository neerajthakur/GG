<?php
class UserController extends BaseController {

	//Add admin/sub_admin users for the website
	public function addUser(){
		return View::make("user.dmeadmin.addUser");
	}

	public function addUserPost(){
		$rules = array(
		  'name' => 'required',
		  'email' => 'required|email|unique:users',
		  'password' => 'required|min:8|max:20|confirmed'
		  
		);
		$messages = array(
			'name.required' => 'The name field is required.',
			'email.required' => 'The email field is required.',
			'email.email' => 'Email must be of valid email format.',
			'email.unique' => 'Email is already in use.',
			'password.required' => 'Password field is required.',
			'password.min' => 'Password must be atleast 8 characters long.',
			'password.max' => 'Password must not be longer than 20 characters.',
			'password_confirmation.confirmed' => 'Passwords do not match.'
		);    
		$validation = Validator::make(Input::all(), $rules, $messages);
		if($validation->fails()){
			return Redirect::back()->withInput()->withErrors($validation);
		}
		//if validation passes, create user

		User::addUser(Input::all());
		Session::forget('userUploadedImage');
		Session::forget('userUploadedImageThumb');
		return Redirect::back()->with('account_success','User has been successfully added.');
	
	}

	//Add users for company
	public function addCompanyUser(){
		$member_id = Session::get("userCompanyId");
		if(!$member_id){
			return Redirect::to("/admin/members/add")->with("Please create a member first.");
		}
		return View::make("user.dmeadmin.addCompanyUser", array('member_id' => $member_id));
	}

	public function addCompanyUserPost(){
		$rules = array(
			'name' => 'required',
			'email' => 'required|email|unique:users',
			'password' => 'required|min:8|max:20|confirmed'
		);
		$messages = array(
			'name.required' => 'The name field is required.',
			'email.required' => 'The email field is required.',
			'email.email' => 'Email must be of valid email format.',
			'email.unique' => 'Email is already in use.',
			'password.required' => 'Password field is required.',
			'password.min' => 'Password must be atleast 8 characters long.',
			'password.max' => 'Password must not be longer than 20 characters.',
			'password_confirmation.confirmed' => 'Passwords do not match.'
		);    
		$validation = Validator::make(Input::all(), $rules, $messages);
		if($validation->fails()){
			return Redirect::back()->withInput()->withErrors($validation);
		}
		//if validation passes, create user

		$lastInsertId = User::addUser(Input::all(), $user_type = 'member');
		Session::forget('userUploadedImage');
		Session::forget('userUploadedImageThumb');
		Session::forget("userCompanyId");
		return Redirect::to("/admin/members/list")->with('account_success','User has been successfully added.');
	}

	public function addCompanyInfo(){
		//$lastInsertMemberId = Session::get("lastInsertMemberId"); 
		$countries = Country::getCountries();
		return View::make("user.dmeadmin.addCompanyInfo", array("countries"=>$countries));
	}

	public function addCompanyInfoPost(){
		
		$rules = array(
		  'company_name' => 'required',
		  'company_code' => 'required',
		  'company_address' => 'required',
		  'company_city' => 'required',
		  'company_state' => 'required',
		  'company_country_id' => 'required',
		  'company_zipcode' => 'required',
		  'company_phone' => 'required',
		  'company_email' => 'email'
		  
		);
		$messages = array(
			'company_name.required' => 'The company name field is required.',
			'company_code.required' => 'The company code field is required.',
			'company_address.required' => 'The address field is required.',
			'company_city.required' => 'The city field is required.',
			'company_state.required' => 'The state field is required.',
			'company_country_id.required' => 'The country field is required.',
			'company_zipcode.required' => 'The zipcode field is required.',
			'company_phone.required' => 'The phone field is required.',
			'company_email.email' => 'Email must be of valid email format.'
		);    
		$validation = Validator::make(Input::all(), $rules, $messages);
		if($validation->fails()){
			return Redirect::back()->withInput()->withErrors($validation);
		}
		//if validation passes, create company/member

		$lastInsertId = Member::addCompany(Input::all());
		Session::forget('userUploadedCompanyImageThumb');
		Session::forget('userUploadedCompanyImage');
		if(Input::has('save_and_continue')) {
			Session::put("lastInsertedCompanyId", $lastInsertId);
			return Redirect::to('/admin/members/addProperty')->with('account_success','Company information has been added successfully.');
		}else{
			return Redirect::to('/admin/members/list')->with('account_success','Company information has been added successfully.');
		}
	}

	public function addPropertyInfo(){
		$member_id = Session::get("lastInsertedCompanyId");
		if(!$member_id){
			return Redirect::to("/admin/members/add")->with("Please create a member first.");
		}
		$countries = Country::getCountries();
		$propertyTypes = PropertyType::getPropertyTypes();
		$propertySizes = PropertySize::getPropertySizes();
		$certificationStandards = CertificationStandard::getCertificationStandards();
		$member_id = Session::get("lastInsertedCompanyId");
		
		//Session::forget("lastInsertedCompanyId");
		return View::make("user.dmeadmin.addPropertyInfo", array("countries"=>$countries, "propertyTypes" => $propertyTypes, "propertySizes" => $propertySizes, "certificationStandards" => $certificationStandards, "member_id" => $member_id));
	}

	public function addPropertyInfoPost(){
		
		
		$rules = array(
			'property_name' => 'required',
			'property_address' => 'required',
			'property_city' => 'required',
			'property_state' => 'required',
			'property_country_id' => 'required',
			'property_zipcode' => 'required',
			'property_phone' => 'required',
			'property_email' => 'email',
			'property_certification_standard_id' => 'required',
			'property_type_id' => 'required',
			'property_size_id' => 'required'
		  
		);
		$messages = array(
			'property_name.required' => 'The name field is required.',
			'property_address.required' => 'The address field is required.',
			'property_city.required' => 'The city field is required.',
			'property_state.required' => 'The state field is required.',
			'property_country.required' => 'The country field is required.',
			'property_zipcode.required' => 'The zipcode field is required.',
			'property_phone.required' => 'The phone field is required.',
			'property_email.email' => 'Email must be of valid email format.',
			'property_certification_standard_id.required' => 'The certification standard field is required.',
			'property_type_id.required' => 'The property type field is required.',
			'property_size_id.required' => 'The property size field is required.',
		);   
		$validation = Validator::make(Input::all(), $rules, $messages);
		if($validation->fails()){
			return Redirect::back()->withInput()->withErrors($validation);
		}
		//if validation passes, create company/member

		$lastInsertId = Property::addProperty(Input::all());
		Session::forget('userUploadedPropertyImageThumb');
		Session::forget('userUploadedPropertyImage');
		Session::forget("lastInsertedCompanyId");
		if(Input::has('save_and_continue')) {
			Session::put("userCompanyId", $lastInsertId);
			return Redirect::to('/admin/members/addUser')->with('account_success','Property information has been added successfully.');
		}else{
			return Redirect::back()->with('account_success','Property information has been added successfully.');
		}

	}
}