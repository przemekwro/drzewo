<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Controllers\UserController;
use App\Http\Controllers\TreeController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api','prefix' => 'auth'], function ($router) {
    Route::post('/register','UserController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group(['middleware'=>'Admin'],function(){
    Route::post('tree','TreeController@store');
    Route::put('tree/parent/{id}', 'TreeController@updateParent');
    Route::put('tree/{id}', 'TreeController@update');
    Route::delete('tree/{id}', 'TreeController@deleteTree');
    Route::delete('tree/node/{id}', 'TreeController@deleteNode');
});

Route::get('tree','TreeController@index');
Route::get('trees','TreeController@indexWithKids');


