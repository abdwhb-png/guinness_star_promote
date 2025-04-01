<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Inspiring;
use App\Http\Resources\SiteSettingResource;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],

            'isAdminDomain' => is_admin_domain(),
            'routePrefix' => route_prefix(),
            'config' => new SiteSettingResource(site_setting()),

            'auth' => [
                'user' => fn() => $request->user()
                    ? new UserResource($request->user())
                    : null,
                'unreadCount' => $request->user()?->unreadNotifications->count() ?? 0,
            ],
            'flash' => [
                'status' => fn() => $request->session()->get('status'),
                'success' => fn() => $request->session()->get('success'),
                'fail' => fn() => $request->session()->get('fail'),
            ],
            'ziggy' => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
