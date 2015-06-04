<?php

class Usertype extends Eloquent {
	protected $table = 'usertypes';
	

	public static function getUsertype($usertype_id = null){
		$query = DB::table('usertypes')->select('usertype')->where('id', $usertype_id)->first();
		return $query;
	}
}