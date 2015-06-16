<?php
class MemberController extends BaseController {
	public function membersList(){
		$members = Member::membersList();
		return View::make("/member/dmeadmin/membersList", array('members' => $members));
	}

	public function memberDetail($hash = null){
		$record = Member::memberDetail($hash);
		return View::make("/member/dmeadmin/memberDetail", array("record" => $record));
	}

	public function memberEdit($hash = null){
		$record = Member::memberDetail($hash);
		$countries = Country::getCountries();
		return View::make("/member/dmeadmin/memberEdit", array("record" => $record, "countries" => $countries));
	}

	public function memberEditPost($hash = null){
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
			'company_name.required' => 'Field is required.',
			'company_code.required' => 'Field is required.',
			'company_address.required' => 'Field is required.',
			'company_city.required' => 'Field is required.',
			'company_state.required' => 'Field is required.',
			'company_country_id.required' => ' ',
			'company_zipcode.required' => 'Field is required.',
			'company_phone.required' => 'Field is required.',
			'company_email.email' => 'Not a valid email format.'
		);    
		$validation = Validator::make(Input::all(), $rules, $messages);
		if($validation->fails()){
			return Redirect::back()->withInput()->withErrors($validation);
		}
		//if validation passes, update company/member

		Member::editCompany(Input::all());
		
		if(Input::has('save_and_listing')) {
			return Redirect::to('/admin/members/list')->with('account_success','Company information has been updated successfully.');
		}else{
			return Redirect::to('/admin/members/detail/'.Input::get('company_hash'))->with('account_success','Company information has been added successfully.');
		}
	
	}
}