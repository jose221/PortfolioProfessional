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
    Route::get('/user', 'api\admin\UserController@index');
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

    Route::group(['prefix'=>'experience/professional'],function (){
    Route::get('/{id}', 'api\admin\ProfessionalExperiencesController@index');
    Route::get('find/{id}', 'api\admin\ProfessionalExperiencesController@find');
    Route::post('create', 'api\admin\ProfessionalExperiencesController@create');
    Route::post('edit/{id}', 'api\admin\ProfessionalExperiencesController@edit');
    Route::post('delete', 'api\admin\ProfessionalExperiencesController@delete');
    });

    Route::group(['prefix'=>'studies'],function (){
        Route::get('/{id}', 'api\admin\StudiesController@index');
        Route::get('find/{id}', 'api\admin\StudiesController@find');
        Route::post('create', 'api\admin\StudiesController@create');
        Route::post('edit/{id}', 'api\admin\StudiesController@edit');
        Route::post('delete', 'api\admin\StudiesController@delete');
    });
    Route::group(['prefix'=>'personal-projects'],function (){
        Route::get('/{id}', 'api\admin\PersonalProjectsController@index');
        Route::get('find/{id}', 'api\admin\PersonalProjectsController@find');
        Route::post('create', 'api\admin\PersonalProjectsController@create');
        Route::post('edit/{id}', 'api\admin\PersonalProjectsController@edit');
        Route::post('delete', 'api\admin\PersonalProjectsController@delete');
    });

    Route::group(['prefix'=>'vitae'],function (){
        Route::get('/{id}', 'api\admin\VitaeController@index');
        Route::get('find/{id}', 'api\admin\VitaeController@find');
        Route::post('create', 'api\admin\VitaeController@create');
        Route::post('edit/{id}', 'api\admin\VitaeController@edit');
        Route::post('show-user/{id}', 'api\admin\VitaeController@selected');
        Route::post('delete', 'api\admin\VitaeController@delete');
    });

    Route::group(['prefix'=>'portfolio-categories'],function (){
        Route::get('/{id}', 'api\admin\PortfolioCategoriesController@index');
        Route::get('find/{id}', 'api\admin\PortfolioCategoriesController@find');
        Route::post('create', 'api\admin\PortfolioCategoriesController@create');
        Route::post('edit/{id}', 'api\admin\PortfolioCategoriesController@edit');
        Route::post('delete', 'api\admin\PortfolioCategoriesController@delete');
    });

    Route::group(['prefix'=>'portfolios'],function (){
        Route::get('/{id}', 'api\admin\PortfolioController@index');
        Route::get('find/{id}', 'api\admin\PortfolioController@find');
        Route::post('create', 'api\admin\PortfolioController@create');
        Route::post('edit/{id}', 'api\admin\PortfolioController@edit');
        Route::post('delete', 'api\admin\PortfolioController@delete');
    });


});
