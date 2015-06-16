<?php

class CertificationStandard extends Eloquent {
	protected $table = 'property_sizes';
	

	public static function getCertificationStandards(){
		$query = DB::table('certification_standards')->select('*')->orderBy("certification_standard", "asc")->get();
		$arrayCertificationStandards = array("" => "--Select--");
		foreach($query as $key => $value){
			$arrayCertificationStandards[$value->id] = $value->certification_standard;
		}
		return $arrayCertificationStandards;
	}
}