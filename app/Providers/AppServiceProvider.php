<?php

namespace App\Providers;

use App\Jobs\AuthJob;
use App\Enums\RolesEnum;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        require_once app_path('Helpers/helpers.php');
        require_once app_path('Helpers/app_helpers.php');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \App\Models\User::observe(\App\Observers\UserObserver::class);
        \Spatie\Permission\Models\Role::observe(\App\Observers\RoleObserver::class);

        Event::listen(Login::class, function ($event) {
            $ip = request()->ip();
            AuthJob::dispatch($event->user, $ip);
        });
        
        RedirectIfAuthenticated::redirectUsing(function () {
            return route(route_prefix() . 'dashboard');
        });

        JsonResource::withoutWrapping();

        // Implicitly grant "root" role all permission checks using can()
        Gate::before(function ($user, $ability) {
            if ($user->hasRole(RolesEnum::ROOT->value)) {
                return true;
            }
        });
    }
}
