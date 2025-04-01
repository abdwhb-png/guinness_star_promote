<?php

use App\Enums\WalletsEnum;
use App\Models\SiteSetting;
use App\Models\PaymentMethod;

if (!function_exists('payment_methods')) {
    function payment_methods(string $type = 'all'): array
    {
        $pMethods = PaymentMethod::where('status', true)->get();

        return match ($type) {
            'symbols' => $pMethods->pluck('symbol')->toArray(),
            'names' => $pMethods->pluck('name')->toArray(),
            'labels' => $pMethods->pluck('label')->toArray(),
            'types' => $pMethods->pluck('type')->toArray(),
            default => $pMethods->toArray(),
        };
    }
}

if (!function_exists('site_setting')) {
    function site_setting($key = null)
    {
        $setting =  SiteSetting::where('status', 1)->first() ?? new SiteSetting;

        if ($key) {
            try {
                return $setting->$key;
            } catch (\Throwable $th) {
                return "";
            }
        }

        return $setting;
    }
}
