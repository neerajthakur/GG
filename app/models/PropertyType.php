<?php

class PropertyType extends Eloquent {
	protected $table = 'property_types';
	

	public static function getPropertyTypes(){
		$query = DB::table('property_types')->select('*')->orderBy("property_type","asc")->get();
		$arrayPropertyTypes = array(""=>"--Select--");
		foreach($query as $key => $value){
			$arrayPropertyTypes[$value->id] = $value->property_type;
		}
		return $arrayPropertyTypes;
	}
}