<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
 * AccountController
 */
Route::middleware('checkUser')->post('login','API\AccountController@login');
Route::post('register','API\AccountController@register');
Route::middleware('auth:api')->group(function(){
    Route::get('logout','API\AccountController@logout');
    Route::get('auth','API\AccountController@authUser');
});

/**
 * AdminController
 */
Route::middleware('auth:api')->prefix('admin')->group(function(){
    Route::get('users','API\AdminController@getAllUsers');
    Route::get('user/{id}','API\AdminController@getUserById');
    Route::delete('delete/{id}','API\AdminController@deleteUser');
    Route::post('create','API\AdminController@createNewUser');
    Route::put('edit','API\AdminController@editUser');
    Route::get('roles','API\AdminController@getAllRoles');
});

