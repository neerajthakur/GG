<?php

class Property extends Eloquent {
	protected $table = 'properties';
	

	public static function addProperty($input){
		$property = new Property();
		$property->property_name = trim($input['property_name']);
		$property->property_address = trim($input['property_address']);
		$property->property_suite = trim($input['property_suite']);
		$property->property_city = trim($input['property_city']);
		$property->property_state = trim($input['property_state']);
		$property->property_country_id = trim($input['property_country_id']);
		$property->property_zipcode = trim($input['property_zipcode']);
		$property->property_phone = trim($input['property_phone']);
		$property->property_fax = trim($input['property_fax']);
		$property->property_email = trim($input['property_email']);
		$property->property_website = trim($input['property_website']);
		$property->property_description = trim($input['property_description']);
		if(Session::has('userUploadedPropertyImage')){
			$property->property_image = Session::get('userUploadedPropertyImage');
		}else{
			$property->property_image = "";
		}
		

		$property->property_membership_code = trim($input['property_membership_code']);
		$property->property_certification_standard_id = trim($input['property_certification_standard_id']);
		if(Input::has('property_preauthorize_audit')) {
			$property_preauthorize_audit = '1';
		}else{
			$property_preauthorize_audit = '0';
		}
		$property->property_preauthorize_audit = $property_preauthorize_audit;
		$property->property_type_id = trim($input['property_type_id']);
		$property->property_size_id = trim($input['property_size_id']);
		$property->member_id = $input['member_id'];
		$property->hash	 = md5(uniqid());
		$property->save();
		$lastInsertId = $property->id;
		return $lastInsertId;
	}

	public static function editProperty($input){
		$property = new Property();
		$property = Property::find(Input::get('property_id'));
		$property->property_name = trim($input['property_name']);
		$property->property_address = trim($input['property_address']);
		$property->property_suite = trim($input['property_suite']);
		$property->property_city = trim($input['property_city']);
		$property->property_state = trim($input['property_state']);
		$property->property_country_id = trim($input['property_country_id']);
		$property->property_zipcode = trim($input['property_zipcode']);
		$property->property_phone = trim($input['property_phone']);
		$property->property_fax = trim($input['property_fax']);
		$property->property_email = trim($input['property_email']);
		$property->property_website = trim($input['property_website']);
		$property->property_description = trim($input['property_description']);
		

		$property->property_membership_code = trim($input['property_membership_code']);
		$property->property_certification_standard_id = trim($input['property_certification_standard_id']);
		if(Input::has('property_preauthorize_audit')) {
			$property_preauthorize_audit = '1';
		}else{
			$property_preauthorize_audit = '0';
		}
		$property->property_preauthorize_audit = $property_preauthorize_audit;
		$property->property_type_id = trim($input['property_type_id']);
		$property->property_size_id = trim($input['property_size_id']);
		
		
		$property->save();
		
		return;
	}


	public static function getProperties($company_id, $count = false){
		$properties = DB::table("properties")->select("properties.*")->where("member_id",$company_id)->get();
		if($count){
			return count($properties);
		}
		return $properties;
	}

	public static function propertiseList($hash = null, $type = 'hash'){
		if($type == 'hash'){
			$member = DB::table("members")->select('id')->where('hash', $hash)->first();
			$id = $member->id;
		}else{
			$id = $hash;
		}
		$properties = DB::table("properties")->select("properties.*", "members.company_name", "members.hash as company_hash", "countries.country_name", "members.company_name", "certification_standards.certification_standard","property_sizes.property_size","property_types.property_type")->leftJoin("members", "members.id", "=", "properties.member_id")->leftJoin("countries", "countries.id", "=", "properties.property_country_id")->leftJoin("property_types", "property_types.id", "=", "properties.property_type_id")->leftJoin("property_sizes", "property_sizes.id", "=", "properties.property_size_id")->leftJoin('certification_standards', 'certification_standards.id', '=', 'properties.property_certification_standard_id')->where("properties.member_id", $id)->get();
		return $properties;
	}

	public static function propertyDetail($hash = null, $type = 'hash'){
		if($type == 'hash'){
			$record = DB::table("properties")->select('properties.*','members.hash as member_hash')->leftJoin("members","members.id","=","properties.member_id")->where('properties.hash', $hash)->first();
		}else{
			$record = DB::table("properties")->select('properties.*','members.hash as member_hash')->leftJoin("members","members.id","=","properties.member_id")->where('properties.id', $hash)->first();
		}
		return $record;
	}
}