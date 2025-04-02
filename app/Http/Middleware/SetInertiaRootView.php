<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use App\Enums\ConfigEnum;
use Illuminate\Http\Request;
use App\Http\Helpers\ConfigHelper;
use Illuminate\Support\Facades\App;

class SetInertiaRootView
{
    public function handle(Request $request, Closure $next)
    {
        if (is_admin_domain()) {
            Inertia::setRootView('admin');
            if (App::getLocale() !== ConfigEnum::ADMIN_LOCALE->value) {
                App::setLocale(ConfigEnum::ADMIN_LOCALE->value);
            }
        } else {
            Inertia::setRootView('app');
            $locale = session('language') ?? ConfigEnum::APP_LOCALE->value;
            if (App::getLocale() !== $locale) {
                App::setLocale($locale);
            }
        }

        return $next($request);
    }
}
