<?php

class Member extends Eloquent {
	protected $table = 'members';
	

	public static function addCompany($input){
		$member = new Member();
		$member->company_name = trim($input['company_name']);
		$member->company_code = trim($input['company_code']);
		$member->company_address = trim($input['company_address']);
		$member->company_suite = trim($input['company_suite']);
		$member->company_city = trim($input['company_city']);
		$member->company_state = trim($input['company_state']);
		$member->company_country_id = trim($input['company_country_id']);
		$member->company_zipcode = trim($input['company_zipcode']);
		$member->company_phone = trim($input['company_phone']);
		$member->company_fax = trim($input['company_fax']);
		$member->company_email = trim($input['company_email']);
		$member->company_website = trim($input['company_website']);
		$member->company_description = trim($input['company_description']);
		if(Session::has('userUploadedCompanyImage')){
			$member->company_logo = Session::get('userUploadedCompanyImage');
		}else{
			$member->company_logo = "";
		}
		$member->hash	 = md5(uniqid());
		$member->save();
		$lastInsertId = $member->id;
		return $lastInsertId;
	}

	public static function editCompany($input){
		$member = new Member();
		$member = $member::find(Input::get('company_id'));
		$member->company_name = trim($input['company_name']);
		$member->company_code = trim($input['company_code']);
		$member->company_address = trim($input['company_address']);
		$member->company_suite = trim($input['company_suite']);
		$member->company_city = trim($input['company_city']);
		$member->company_state = trim($input['company_state']);
		$member->company_country_id = trim($input['company_country_id']);
		$member->company_zipcode = trim($input['company_zipcode']);
		$member->company_phone = trim($input['company_phone']);
		$member->company_fax = trim($input['company_fax']);
		$member->company_email = trim($input['company_email']);
		$member->company_website = trim($input['company_website']);
		$member->company_description = trim($input['company_description']);
		$member->save();
		return;
	}

	public static function membersList(){
		$membersList = DB::table('members')->select('members.*','countries.country_name')->leftJoin("countries", "countries.id","=","members.company_country_id")->orderBy("members.company_name", "asc")->get();
		return $membersList;
		
	}

	public static function memberDetail($hash = null, $type = 'hash'){
		if($type == 'hash'){
			$member = DB::table("members")->select('id')->where('hash', $hash)->first();
			$id = $member->id;
		}else{
			$id = $hash;
		}
		$memberDetail = DB::table("members")->select('members.*', 'countries.country_name')->leftJoin('countries','countries.id','=','members.company_country_id')->where('members.id', $id)->first();
		
		return $memberDetail;
	}
}