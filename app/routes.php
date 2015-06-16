<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//Login Controllers
Route::get('/', 'LoginController@index');
Route::post('/', array('before'=>'csrf', 'uses'=>'LoginController@post'));
Route::get('/logout', 'LoginController@logout');

Route::get('/password/reset', 'PasswordController@remind');
Route::post('/password/reset', array( 'uses' => 'PasswordController@request','as' => 'password.request'));



Route::get('/password/reset/{token}', array('uses' => 'PasswordController@reset','as' => 'password.reset'));
Route::post('/password/reset/{token}', array('uses' => 'PasswordController@update','as' => 'password.update'));



//Login Controllers for Admin
Route::get('/admin', 'LoginController@adminLogin');
Route::post('/admin', array('before'=>'csrf', 'uses'=>'LoginController@adminLoginPost'));



//Admin Urls
Route::group(array('before'=>'auth_admin'), function(){
	Route::get('/admin/dashboard', 'DashboardController@adminDashboard');
	Route::get('/admin/users/add', 'UserController@addUser');
	Route::post('/admin/users/add', 'UserController@addUserPost');

	//Route::get('/admin/members/add', 'UserController@addMember');
	//Route::post('/admin/members/add', 'UserController@addMemberPost');

	Route::get('/admin/members/add/{hash?}', 'UserController@addCompanyInfo');
	Route::post('/admin/members/add', 'UserController@addCompanyInfoPost');

	Route::get('/admin/members/addProperty/{hash?}', 'UserController@addPropertyInfo');
	Route::post('/admin/members/addProperty', 'UserController@addPropertyInfoPost');

	Route::get('/admin/members/addUser', 'UserController@addCompanyUser');
	Route::post('/admin/members/addUser', 'UserController@addCompanyUserPost');

	Route::get('/admin/members/list', 'MemberController@membersList');
	//Route::post('/admin/members/list',);

	Route::get('/admin/members/detail/{hash}', 'MemberController@memberDetail');
	Route::get('/admin/members/properties/{hash}', 'PropertyController@propertiseList');

	Route::get('/admin/members/edit/{hash}', 'MemberController@memberEdit');
	Route::post('/admin/members/edit/{hash}', 'MemberController@memberEditPost');

	Route::get('/admin/members/property/edit/{hash}', 'PropertyController@propertyEdit');
	Route::post('/admin/members/property/edit/{hash}', 'PropertyController@propertyEditPost');

});

//Services (requires user authorization)
Route::group(array('before'=>'auth'), function(){
	Route::get('/upload', 'FileController@getUploadForm');
	Route::post('/upload/image','FileController@uploadImage');
	Route::post('/upload/image/edit/{hash}','FileController@uploadImageEdit');
});