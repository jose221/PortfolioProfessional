<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('/myportfolio/{lang}','api\LandingController@index');
Route::get('/myportfolio/myperfil/{lang}','api\LandingController@myPerfil');
Route::get('/myportfolio/studies/{lang}','api\LandingController@studies');
Route::get('/myportfolio/mycontacts/{lang}','api\LandingController@myContacts');
Route::get('/myportfolio/myknowledges/{lang}','api\LandingController@myKnowledges');
Route::get('/myportfolio/personalprojects/{lang}','api\LandingController@personalProjects');
Route::get('/myportfolio/professionalprojects/{lang}','api\LandingController@professionalProjects');
Route::get('/myportfolio/portfoliocategories/{lang}','api\LandingController@portfolioCategories');
