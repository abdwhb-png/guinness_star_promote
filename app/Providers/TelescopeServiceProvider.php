<?php

namespace App\Providers;

use App\Models\User;
use Laravel\Telescope\Telescope;
use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\TelescopeApplicationServiceProvider;

class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Telescope::night();


        $this->hideSensitiveRequestDetails();

        Telescope::avatar(function (string $id, string $email) {
            return User::find($id)->profile_photo_url;
        });

        Telescope::tag(function (IncomingEntry $entry) {
            return $entry->type === 'request'
                ? ['path=:' . $entry->content['uri']]
                : [];
        });

        $isLocal = $this->app->environment('local');
        $isProduction = $this->app->environment('production');

        Telescope::filter(function (IncomingEntry $entry) use ($isLocal, $isProduction) {
            return $isLocal || $isProduction ||
                $entry->isReportableException() ||
                $entry->isFailedRequest() ||
                $entry->isFailedJob() ||
                $entry->isScheduledTask() ||
                $entry->hasMonitoredTag();
        });
    }

    /**
     * Prevent sensitive request details from being logged by Telescope.
     */
    protected function hideSensitiveRequestDetails(): void
    {
        if ($this->app->environment('local')) {
            return;
        }

        Telescope::hideRequestParameters(['_token']);

        Telescope::hideRequestHeaders([
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ]);
    }

    /**
     * Register the Telescope gate.
     *
     * This gate determines who can access Telescope in non-local environments.
     */
    protected function gate(): void
    {
        Gate::define('viewTelescope', function ($user) {
            return $user->isSuperAdmin();
        });
    }
}
