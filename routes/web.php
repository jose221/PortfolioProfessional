<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{lang}', 'indexController@setLanguage')->name('index.language');
Route::get('/', 'indexController@index')->name('index');
Route::prefix('admin')->group(function() {
    Auth::routes();
});
//Grupo de rutas para el administrador
//USUARIO
Route::post('/update','HomeController@update')->middleware(['auth','api.access.admin'])->name('user.update');
Route::group(['prefix'=>'admin','middleware'=>['auth','api.access.admin']],function(){
    //users
    Route::group(['prefix'=>'users','namespace'=>'Admin'],function (){
        Route::name('users.')->group(function () {
            Route::get('/', 'UsersController@index')->name('view');
        });
    });
    //estudios
    Route::group(['prefix'=>'studies','namespace'=>'Admin'],function (){
        Route::name('studies.')->group(function (){
            Route::get('/', 'studiesController@index')->name('view');
            Route::get('/edit/{id}', 'studiesController@edit')->name('edit');
            Route::post('/update/{id}', 'studiesController@update')->name('update');
            Route::get('/create', 'studiesController@create')->name('create');
            Route::post('/store', 'studiesController@store')->name('store');
            Route::delete('/delete/{id}', 'studiesController@destroy')->name('delete');
        });
    });
    //experiencia profesional
    Route::group(['prefix'=>'experience/professional','namespace'=>'Admin'],function (){
        Route::name('experience.professional.')->group(function (){
            Route::get('/','professionalExperiencesController@index')->name('view');
            Route::get('/edit/{id}','professionalExperiencesController@edit')->name('edit');
            Route::get('/create','professionalExperiencesController@create')->name('create');
            Route::post('/update/{id}', 'professionalExperiencesController@update')->name('update');
            Route::post('/store', 'professionalExperiencesController@store')->name('store');
            Route::delete('/delete/{id}', 'professionalExperiencesController@destroy')->name('delete');
        });
    });
    //proyectos personales
    Route::group(['prefix'=>'personal/project','namespace'=>'Admin'],function (){
       Route::name('project.personal.')->group(function (){
            Route::get('/','personalProjectsController@index')->name('view');
            Route::get('/edit/{id}','personalProjectsController@edit')->name('edit');
            Route::get('/create','personalProjectsController@create')->name('create');
           Route::post('/update/{id}', 'personalProjectsController@update')->name('update');
           Route::post('/store', 'personalProjectsController@store')->name('store');
           Route::delete('/delete/{id}', 'personalProjectsController@destroy')->name('delete');
        });
    });
    //mensajes
    Route::group(['prefix'=>'message','namespace'=>'Admin'],function (){
        Route::name('messages.')->group(function (){
            Route::get('/','messagesController@index')->name('view');
            Route::post('viewed/{id}','messagesController@updateStatusViewed')->name('viewed');
            Route::delete('delete/{id}','messagesController@destroy')->name('delete');
        });
    });
    //mis contactos
    Route::group(['prefix'=>'contacts','namespace'=>'Admin'],function (){
        Route::name('contacts.')->group(function (){
            Route::get('/','myContactsController@index')->name('view');
            Route::post('contacts/store', 'myContactsController@store')->name('store');
            Route::get('/edit/{id}','myContactsController@edit')->name('edit');
            Route::get('/create','myContactsController@create')->name('create');
            Route::post('/update/{id}', 'myContactsController@update')->name('update');
            Route::delete('/delete/{id}', 'myContactsController@destroy')->name('delete');
        });
    });

    //mi categoria de porfatolios
    Route::group(['prefix'=>'portfolio-categories','namespace'=>'Admin'],function (){
        Route::name('portfolio-categories.')->group(function (){
            Route::get('/','portfolioCategoriesController@index')->name('view');
            Route::post('contacts/store', 'portfolioCategoriesController@store')->name('store');
            Route::get('/edit/{id}','portfolioCategoriesController@edit')->name('edit');
            Route::get('/create','portfolioCategoriesController@create')->name('create');
            Route::post('/update/{id}', 'portfolioCategoriesController@update')->name('update');
            Route::delete('/delete/{id}', 'portfolioCategoriesController@destroy')->name('delete');
        });
        Route::group(['prefix'=>'portfolio'],function (){
            Route::name('portfolio-categories.portfolio.')->group(function () {
                Route::get('/{id}','portfolioController@index')->name('view');
                Route::post('/update/{id}', 'portfolioController@update')->name('update');
                Route::post('/store/{id}', 'portfolioController@store')->name('store');
                Route::delete('/delete/{id}', 'portfolioController@destroy')->name('delete');
            });
        });
    });
    Route::group(['prefix'=>'vitae', 'namespace'=>'Admin'],function (){
        Route::name('users.vitae.')->group(function () {
            Route::get('/','historyCurriculumVitaeController@index')->name('view');
            Route::post('/update/{id}', 'historyCurriculumVitaeController@update')->name('update');
            Route::post('/selected/{id}', 'historyCurriculumVitaeController@selected')->name('selected');
            Route::post('/store', 'historyCurriculumVitaeController@store')->name('store');
            Route::delete('/delete/{id}', 'historyCurriculumVitaeController@destroy')->name('delete');
        });
    });
    //mis conocimientos
    Route::group(['prefix'=>'knowledges','namespace'=>'Admin'],function (){
        Route::name('knowledges.')->group(function (){
            Route::get('/','knowLedgesController@index')->name('view');
            Route::get('/edit/{id}','knowLedgesController@edit')->name('edit');
            Route::get('/show/{id}','knowLedgesController@show')->name('show');
            Route::get('/create','knowLedgesController@create')->name('create');
            Route::post('/update/{id}', 'knowLedgesController@update')->name('update');
            Route::post('/store', 'knowLedgesController@store')->name('store');
            Route::delete('/delete/{id}', 'knowLedgesController@destroy')->name('delete');
        });
        Route::group(['prefix'=>'abilities'],function (){
            Route::name('knowledges.abilities.')->group(function (){
                Route::get('/edit/{id}','knowLedgesAbilitiesController@edit')->name('edit');
                Route::get('/create/{id}','knowLedgesAbilitiesController@create')->name('create');
                Route::post('/update/{id}', 'knowLedgesAbilitiesController@update')->name('update');
                Route::post('/store/{id}', 'knowLedgesAbilitiesController@store')->name('store');
                Route::delete('/delete/{id}', 'knowLedgesAbilitiesController@destroy')->name('delete');
            });
        });
    });
});
Route::group(['namespace'=>'Admin'],function (){
    Route::post('message/send','messagesController@send')->name('messages.send');
});

Route::get('admin/home', 'HomeController@index')->name('home');
/**Route::get('/uploads/cv/{id}', function ($id) {
    $data = \App\Models\HistoryCurriculumVitae::find($id);
    return Storage::url($data->path);
});**/
