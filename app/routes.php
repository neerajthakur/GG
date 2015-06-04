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
});
