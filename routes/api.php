<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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
Route::get('/list/portfolio-categories','Admin\portfolioCategoriesController@getPortfoliosCategories');
Route::get('/list/portfolios','Admin\portfolioController@getPortfolios');
//peticiones principales
Route::post('/myportfolio/message/send/{lang}','api\messageController@send');
Route::get('/myportfolio/{lang}','api\LandingController@index');
Route::get('/myportfolio/myperfil/{lang}','api\LandingController@myPerfil');
Route::get('/myportfolio/studies/{lang}','api\LandingController@studies');
Route::get('/myportfolio/mycontacts/{lang}','api\LandingController@myContacts');
Route::get('/myportfolio/myknowledges/{lang}','api\LandingController@myKnowledges');
Route::get('/myportfolio/personalprojects/{lang}','api\LandingController@personalProjects');
Route::get('/myportfolio/professionalprojects/{lang}','api\LandingController@professionalProjects');
Route::get('/myportfolio/portfoliocategories/{lang}','api\LandingController@portfolioCategories');


//Admin

Route::group(['prefix'=>'admin'],function (){
    Route::get('/user/{id}', 'api\admin\UserController@find');
    Route::post('/user/{id}', 'api\admin\UserController@update');

    Route::get('/contacts/{id}', 'api\admin\MyContactsController@index');
    Route::post('/contacts/edit/{id}', 'api\admin\MyContactsController@edit');
    Route::post('/contacts/delete', 'api\admin\MyContactsController@delete');
    Route::post('/contacts/create', 'api\admin\MyContactsController@create');

    Route::get('/knowledges/{id}', 'api\admin\KnowLedgesController@index');
    Route::get('/knowledges/find/{id}', 'api\admin\KnowLedgesController@find');
    Route::post('/knowledges/create', 'api\admin\KnowLedgesController@create');
    Route::post('/knowledges/edit/{id}', 'api\admin\KnowLedgesController@edit');
    Route::post('/knowledges/delete', 'api\admin\KnowLedgesController@delete');

    Route::get('/knowledges/abilities/{id}', 'api\admin\KnowLedgesAbilitiesController@index');
    Route::post('/knowledges/abilities/create', 'api\admin\KnowLedgesAbilitiesController@create');
    Route::post('/knowledges/abilities/edit/{id}', 'api\admin\KnowLedgesAbilitiesController@edit');
    Route::post('/knowledges/abilities/delete', 'api\admin\KnowLedgesAbilitiesController@delete');


});
