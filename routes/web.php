<?php

use Illuminate\Support\Facades\Route;

// ✅ Importación de controladores
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\StudiesController;
use App\Http\Controllers\Admin\ProfessionalExperiencesController;
use App\Http\Controllers\Admin\PersonalProjectsController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\MyContactsController;
use App\Http\Controllers\Admin\PortfolioCategoriesController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\HistoryCurriculumVitaeController;
use App\Http\Controllers\Admin\KnowledgesController;
use App\Http\Controllers\Admin\KnowledgesAbilitiesController;

Route::get('/', function () {
    return redirect('/admin/login');
})->name('index');

// 🧩 Login & Registro
Route::prefix('admin')->group(function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::get('/home', [HomeController::class, 'index'])->middleware(['auth','api.access.admin'])->name('home');
});

// 🧩 Usuario
Route::post('/update', [HomeController::class, 'update'])->middleware(['auth','api.access.admin'])->name('user.update');

// 🧩 Rutas protegidas del administrador
Route::prefix('admin')->middleware(['auth','api.access.admin'])->group(function () {

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('view');
    });

    Route::prefix('studies')->name('studies.')->group(function () {
        Route::get('/', [StudiesController::class, 'index'])->name('view');
        Route::get('/edit/{id}', [StudiesController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [StudiesController::class, 'update'])->name('update');
        Route::get('/create', [StudiesController::class, 'create'])->name('create');
        Route::post('/store', [StudiesController::class, 'store'])->name('store');
        Route::delete('/delete/{id}', [StudiesController::class, 'destroy'])->name('delete');
    });

    Route::prefix('experience/professional')->name('experience.professional.')->group(function () {
        Route::get('/', [ProfessionalExperiencesController::class, 'index'])->name('view');
        Route::get('/edit/{id}', [ProfessionalExperiencesController::class, 'edit'])->name('edit');
        Route::get('/create', [ProfessionalExperiencesController::class, 'create'])->name('create');
        Route::post('/update/{id}', [ProfessionalExperiencesController::class, 'update'])->name('update');
        Route::post('/store', [ProfessionalExperiencesController::class, 'store'])->name('store');
        Route::delete('/delete/{id}', [ProfessionalExperiencesController::class, 'destroy'])->name('delete');
    });

    Route::prefix('personal/project')->name('project.personal.')->group(function () {
        Route::get('/', [PersonalProjectsController::class, 'index'])->name('view');
        Route::get('/edit/{id}', [PersonalProjectsController::class, 'edit'])->name('edit');
        Route::get('/create', [PersonalProjectsController::class, 'create'])->name('create');
        Route::post('/update/{id}', [PersonalProjectsController::class, 'update'])->name('update');
        Route::post('/store', [PersonalProjectsController::class, 'store'])->name('store');
        Route::delete('/delete/{id}', [PersonalProjectsController::class, 'destroy'])->name('delete');
    });

    Route::prefix('message')->name('messages.')->group(function () {
        Route::get('/', [MessagesController::class, 'index'])->name('view');
        Route::post('viewed/{id}', [MessagesController::class, 'updateStatusViewed'])->name('viewed');
        Route::delete('delete/{id}', [MessagesController::class, 'destroy'])->name('delete');
    });

    Route::prefix('contacts')->name('contacts.')->group(function () {
        Route::get('/', [MyContactsController::class, 'index'])->name('view');
        Route::post('contacts/store', [MyContactsController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [MyContactsController::class, 'edit'])->name('edit');
        Route::get('/create', [MyContactsController::class, 'create'])->name('create');
        Route::post('/update/{id}', [MyContactsController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [MyContactsController::class, 'destroy'])->name('delete');
    });

    Route::prefix('portfolio-categories')->name('portfolio-categories.')->group(function () {
        Route::get('/', [PortfolioCategoriesController::class, 'index'])->name('view');
        Route::post('contacts/store', [PortfolioCategoriesController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [PortfolioCategoriesController::class, 'edit'])->name('edit');
        Route::get('/create', [PortfolioCategoriesController::class, 'create'])->name('create');
        Route::post('/update/{id}', [PortfolioCategoriesController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [PortfolioCategoriesController::class, 'destroy'])->name('delete');

        Route::prefix('portfolio')->name('portfolio.')->group(function () {
            Route::get('/{id}', [PortfolioController::class, 'index'])->name('view');
            Route::post('/update/{id}', [PortfolioController::class, 'update'])->name('update');
            Route::post('/store/{id}', [PortfolioController::class, 'store'])->name('store');
            Route::delete('/delete/{id}', [PortfolioController::class, 'destroy'])->name('delete');
        });
    });

    Route::prefix('vitae')->name('users.vitae.')->group(function () {
        Route::get('/', [HistoryCurriculumVitaeController::class, 'index'])->name('view');
        Route::post('/update/{id}', [HistoryCurriculumVitaeController::class, 'update'])->name('update');
        Route::post('/selected/{id}', [HistoryCurriculumVitaeController::class, 'selected'])->name('selected');
        Route::post('/store', [HistoryCurriculumVitaeController::class, 'store'])->name('store');
        Route::delete('/delete/{id}', [HistoryCurriculumVitaeController::class, 'destroy'])->name('delete');
    });

    Route::prefix('knowledges')->name('knowledges.')->group(function () {
        Route::get('/', [KnowledgesController::class, 'index'])->name('view');
        Route::get('/edit/{id}', [KnowledgesController::class, 'edit'])->name('edit');
        Route::get('/show/{id}', [KnowledgesController::class, 'show'])->name('show');
        Route::get('/create', [KnowledgesController::class, 'create'])->name('create');
        Route::post('/update/{id}', [KnowledgesController::class, 'update'])->name('update');
        Route::post('/store', [KnowledgesController::class, 'store'])->name('store');
        Route::delete('/delete/{id}', [KnowledgesController::class, 'destroy'])->name('delete');

        Route::prefix('abilities')->name('abilities.')->group(function () {
            Route::get('/edit/{id}', [KnowledgesAbilitiesController::class, 'edit'])->name('edit');
            Route::get('/create/{id}', [KnowledgesAbilitiesController::class, 'create'])->name('create');
            Route::post('/update/{id}', [KnowledgesAbilitiesController::class, 'update'])->name('update');
            Route::post('/store/{id}', [KnowledgesAbilitiesController::class, 'store'])->name('store');
            Route::delete('/delete/{id}', [KnowledgesAbilitiesController::class, 'destroy'])->name('delete');
        });
    });
});

// Ruta externa para enviar mensaje
Route::post('message/send', [MessagesController::class, 'send'])->name('messages.send');

// Redirección si se accede directamente a /admin/home
Route::get('admin/home', [HomeController::class, 'index'])->name('home');
