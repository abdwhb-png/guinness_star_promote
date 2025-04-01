<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Helpers\ConfigHelper;

class SetInertiaRootView
{
    public function handle(Request $request, Closure $next)
    {
        if (is_admin_domain()) {
            Inertia::setRootView('admin');
        } else {
            Inertia::setRootView('app');
        }

        return $next($request);
    }
}
