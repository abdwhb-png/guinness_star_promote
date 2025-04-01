<?php

use Inertia\Inertia;
use App\Enums\RolesEnum;
use App\Http\Controllers\DealController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::redirect('/', '/dashboard', 301)->name('home');

Route::middleware(['auth', 'verified', 'role:' . RolesEnum::USER->value])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render(page_dir() . 'Home');
    })->name('dashboard');

    Route::inertia('/account', page_dir() . 'Account')->name('account');
    Route::inertia('/more', page_dir() . 'More')->name('more');
    Route::inertia('/start', page_dir() . 'Start')->name('start');
    Route::inertia('/history', page_dir() . 'History')->name('history');

    Route::controller(DealController::class)->group(function () {
        Route::get('/user-deal', 'deal')->name('user.deal');
        Route::put('/user-deal', 'performDeal')->name('user.deal.perform');
        Route::post('/deal-like/{deal}', 'like')->name('deal.like');
    });
});

require __DIR__ . '/base.php';
