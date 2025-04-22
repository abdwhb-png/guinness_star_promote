<?php

use App\Models\Membership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\DealController;
use App\Http\Controllers\UserController;
use App\Http\Resources\SiteSettingResource;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\NotificationController;

Route::post('change-language', function (Request $request) {
    if (in_array($request->lang, config('vars.translatable_locales'))) {
        session()->put('language', $request->lang);
        return response()->json(['success' => true]);
    }
    return response()->json(['success' => false]);
})->name('change-language');

Route::middleware('auth')->group(function () {
    Route::resources([
        'transaction' => TransactionController::class,
        'notification' => NotificationController::class,
        'deal' => DealController::class,
    ]);

    Route::patch('/notifications', [NotificationController::class, 'markAllAsRead'])->name('notifications.read');
    Route::delete('/notifications', [NotificationController::class, 'deleteAll'])->name('notifications.delete');

    Route::prefix('user')->as('user.')->controller(UserController::class)->group(function () {
        Route::put('/profile-photo', 'updateProfilePhoto')->name('profile-photo.update');
        Route::put('/password/{id?}', 'updatePassword')->name('password.update');
        Route::put('/info/{id?}', 'updateInfo')->name('info.update');
        Route::put('/payment-method/{id?}', 'updatePaymentMethod')->name('payment-method.update');

        Route::get('/deals/{id?}', 'deals')->name('deals');
        Route::get('/transactions/{id?}', 'transactions')->name('transactions');

        Route::delete('/{id?}', 'destroy')->name('destroy');

        Route::get('/sessions', 'sessionsGet')->name('sessions');
        Route::post('/sessions', 'logoutOtherSessions')->name('sessions.logout-other');
    });

    Route::resource('user', UserController::class)->only([
        'index',
        'show',
        'store',
        'update',
        // 'destroy',
    ]);
});

Route::get('/config/{param?}', function ($param = "") {
    if ($param == 'languages') {
        return Storage::disk('local')->get('languages.json');
    }
    return new SiteSettingResource(site_setting());
})->name('config');

Route::get('/memberships', function () {
    return Membership::where('status', 1)->get()->toArray();
})->name('memberships');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
