<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// ✅ Controladores
use App\Http\Controllers\Admin\PortfolioCategoriesController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\LandingController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\MyContactsController;
use App\Http\Controllers\Api\Admin\KnowLedgesController;
use App\Http\Controllers\Api\Admin\KnowLedgesAbilitiesController;
use App\Http\Controllers\Api\Admin\ProfessionalExperiencesController;
use App\Http\Controllers\Api\Admin\StudiesController;
use App\Http\Controllers\Api\Admin\PersonalProjectsController;
use App\Http\Controllers\Api\Admin\VitaeController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// 📂 Portfolios públicos
Route::get('/list/portfolio-categories', [PortfolioCategoriesController::class, 'getPortfoliosCategories']);
Route::get('/list/portfolios', [PortfolioController::class, 'getPortfolios']);

// 📂 Landing pública
Route::prefix('myportfolio/{lang}')->group(function () {
    Route::post('/message/send', [MessageController::class, 'send']);
    Route::get('/', [LandingController::class, 'index']);
    Route::get('/myperfil', [LandingController::class, 'myPerfil']);
    Route::get('/studies', [LandingController::class, 'studies']);
    Route::get('/mycontacts', [LandingController::class, 'myContacts']);
    Route::get('/myknowledges', [LandingController::class, 'myKnowledges']);
    Route::get('/personalprojects', [LandingController::class, 'personalProjects']);
    Route::get('/professionalprojects', [LandingController::class, 'professionalProjects']);
    Route::get('/portfoliocategories', [LandingController::class, 'portfolioCategories']);
});

// 📂 Admin
Route::prefix('admin')->group(function () {

    // 👤 User
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'find']);
    Route::post('/user/{id}', [UserController::class, 'update']);

    // 📇 Contacts
    Route::prefix('contacts')->group(function () {
        Route::get('/{id}', [MyContactsController::class, 'index']);
        Route::post('/edit/{id}', [MyContactsController::class, 'edit']);
        Route::post('/delete', [MyContactsController::class, 'delete']);
        Route::post('/create', [MyContactsController::class, 'create']);
    });

    // 📘 Knowledges
    Route::prefix('knowledges')->group(function () {
        Route::get('/{id}', [KnowLedgesController::class, 'index']);
        Route::get('/find/{id}', [KnowLedgesController::class, 'find']);
        Route::post('/create', [KnowLedgesController::class, 'create']);
        Route::post('/edit/{id}', [KnowLedgesController::class, 'edit']);
        Route::post('/delete', [KnowLedgesController::class, 'delete']);

        Route::prefix('abilities')->group(function () {
            Route::get('/{id}', [KnowLedgesAbilitiesController::class, 'index']);
            Route::post('/create', [KnowLedgesAbilitiesController::class, 'create']);
            Route::post('/edit/{id}', [KnowLedgesAbilitiesController::class, 'edit']);
            Route::post('/delete', [KnowLedgesAbilitiesController::class, 'delete']);
        });
    });

    // 🧠 Experience
    Route::prefix('experience/professional')->group(function () {
        Route::get('/{id}', [ProfessionalExperiencesController::class, 'index']);
        Route::get('/find/{id}', [ProfessionalExperiencesController::class, 'find']);
        Route::post('/create', [ProfessionalExperiencesController::class, 'create']);
        Route::post('/edit/{id}', [ProfessionalExperiencesController::class, 'edit']);
        Route::post('/delete', [ProfessionalExperiencesController::class, 'delete']);
    });

    // 📚 Studies
    Route::prefix('studies')->group(function () {
        Route::get('/{id}', [StudiesController::class, 'index']);
        Route::get('/find/{id}', [StudiesController::class, 'find']);
        Route::post('/create', [StudiesController::class, 'create']);
        Route::post('/edit/{id}', [StudiesController::class, 'edit']);
        Route::post('/delete', [StudiesController::class, 'delete']);
    });

    // 🧩 Personal Projects
    Route::prefix('personal-projects')->group(function () {
        Route::get('/{id}', [PersonalProjectsController::class, 'index']);
        Route::get('/find/{id}', [PersonalProjectsController::class, 'find']);
        Route::post('/create', [PersonalProjectsController::class, 'create']);
        Route::post('/edit/{id}', [PersonalProjectsController::class, 'edit']);
        Route::post('/delete', [PersonalProjectsController::class, 'delete']);
    });

    // 📄 Vitae
    Route::prefix('vitae')->group(function () {
        Route::get('/{id}', [VitaeController::class, 'index']);
        Route::get('/find/{id}', [VitaeController::class, 'find']);
        Route::post('/create', [VitaeController::class, 'create']);
        Route::post('/edit/{id}', [VitaeController::class, 'edit']);
        Route::post('/show-user/{id}', [VitaeController::class, 'selected']);
        Route::post('/delete', [VitaeController::class, 'delete']);
    });

    // 🎨 Portfolio categories
    Route::prefix('portfolio-categories')->group(function () {
        Route::get('/{id}', [PortfolioCategoriesController::class, 'index']);
        Route::get('/find/{id}', [PortfolioCategoriesController::class, 'find']);
        Route::post('/create', [PortfolioCategoriesController::class, 'create']);
        Route::post('/edit/{id}', [PortfolioCategoriesController::class, 'edit']);
        Route::post('/delete', [PortfolioCategoriesController::class, 'delete']);
    });

    // 🎨 Portfolios
    Route::prefix('portfolios')->group(function () {
        Route::get('/{id}', [PortfolioController::class, 'index']);
        Route::get('/find/{id}', [PortfolioController::class, 'find']);
        Route::post('/create', [PortfolioController::class, 'create']);
        Route::post('/edit/{id}', [PortfolioController::class, 'edit']);
        Route::post('/delete', [PortfolioController::class, 'delete']);
    });
});
