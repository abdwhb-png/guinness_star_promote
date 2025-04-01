<?php

use App\Enums\RolesEnum;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DealController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DealsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\RolePermissionController;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    $roles = [RolesEnum::ADMIN->value, RolesEnum::SUPERADMIN->value, RolesEnum::ROOT->value];
    Route::middleware('role:' . implode('|', $roles))
        ->group(function () {
            Route::controller(AdminController::class)->group(function () {
                Route::get('/dashboard', 'index')->name('dashboard');
                Route::get('/notifications', 'notifications')->name('notifications');
                Route::get('/data-totals', 'getDataTotals')->name('data-totals');
            });
            Route::get('/users', [UsersController::class, 'index'])->name('users');
            Route::get('/transactions', [TransactionsController::class, 'index'])->name('transactions');
            Route::get('/deals', [DealsController::class, 'index'])->name('deals');
            Route::post('/process-deal', [DealController::class, 'processDeal'])->name('process-deal');
        });

    Route::middleware('role:' . implode('|', Arr::except($roles, RolesEnum::ADMIN->value)))
        ->group(function () {
            Route::controller(AdminController::class)->group(function () {
                Route::put('/pmethod/{item}', 'pmethodUpdate')->name('pmethod.update');
                Route::put('/cservice/{item}', 'cserviceUpdate')->name('cservice.update');
                Route::put('/setting/{item}', 'settingUpdate')->name('setting.update');
                Route::put('/membership/{item}', 'membershipUpdate')->name('membership.update');
                Route::delete('/delete-data/{table}/{id}', 'deleteData')->name('delete-data');
            });

            Route::controller(UsersController::class)->group(function () {
                Route::put('/set-negative/{id}', 'setNegative')->name('set-negative');
                Route::post('/reset-deals/{user}', 'resetDeals')->name('reset-deals');
                Route::post('/defroze/{user}', 'defroze')->name('defroze');
            });

            Route::delete('/deals', [DealsController::class, 'destroy'])->name('deals.delete');
            Route::delete('/transactions', [TransactionsController::class, 'destroy'])->name('transactions.delete');

            Route::resource('roles-perms', RolePermissionController::class)->only([
                'index',
                'store',
            ]);
            Route::put('/roles-perms/{user:email}', [RolePermissionController::class, 'update'])->name('roles-perms.update');
        });
});

require __DIR__ . '/base.php';
