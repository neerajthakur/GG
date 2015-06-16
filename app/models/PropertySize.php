<?php

class PropertySize extends Eloquent {
	protected $table = 'property_sizes';
	

	public static function getPropertySizes(){
		$query = DB::table('property_sizes')->select('*')->orderBy("property_size", "asc")->get();
		$arrayPropertySizes = array("" => "--Select--");
		foreach($query as $key => $value){
			$arrayPropertySizes[$value->id] = $value->property_size;
		}
		return $arrayPropertySizes;
	}
}