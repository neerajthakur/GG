<?php

class Country extends Eloquent {
	protected $table = 'countries';
	

	public static function getCountries(){
		$query = DB::table('countries')->select('*')->orderBy("country_name","asc")->get();
		$arrayCountries = array(""=>"--Select--");
		foreach($query as $key => $value){
			$arrayCountries[$value->id] = $value->country_name;
		}
		return $arrayCountries;
	}
}