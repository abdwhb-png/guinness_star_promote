<?php

namespace App\Helpers;

use App\Models\Deal;
use App\Enums\ConfigEnum;
use App\Enums\TransacEnum;
use App\Enums\StatusesEnum;

class ConfigHelper
{
    const MAX_DEALS = 30;
    const WELCOME_BONUS = 50;
    const PROFIT_MAX_ON_FIRST = 27;
    const ENABLE_VIP = false;

    static public function getProfitRatio(): float
    {
        return site_setting('profit_ratio') ?? (float)ConfigEnum::DEFAULT_PROFIT_RATIO->value;
    }

    static public function getMaxDeals(): int
    {
        return site_setting('max_deals') ?? (int)ConfigEnum::MAX_DEALS->value;
    }

    static public function getWelcomeBonus(): float
    {
        return site_setting('welcome_bonus') ?? (int)ConfigEnum::WELCOME_BONUS->value;
    }

    static public function getDefaultCurrency(): string
    {
        return site_setting('base_currency') ?? ConfigEnum::DEFAULT_CURRENCY->value;
    }

    static public function getProfitMaxOnFirst(): float
    {
        return site_setting('profit_max_on_first') ?? (int)ConfigEnum::PROFIT_MAX_ON_FIRST->value;
    }

    static public function getPasswordTypes(): array
    {
        return ['login', 'withdrawal'];
    }

    static public function getTransactionTypes(): array
    {
        return collect(TransacEnum::cases())->map(function ($item) {
            return $item->value;
        })->toArray();
    }

    static public function getDealCategories(): array
    {
        return Deal::distinct()->pluck('category')->filter()->values()->toArray();
    }

    static public function getProfitTypes(): array
    {
        return [
            'positive' => 'Positive',
            'negative' => 'Negative',
            'break-even' => 'Break Even',
        ];
    }

    static public function getStatuses($type = ''): array
    {
        $collect = collect(StatusesEnum::cases());

        if ($type == 'transaction') {
            $statuses =  $collect->filter(function ($item) {
                return in_array($item->value, [
                    StatusesEnum::PENDING->value,
                    StatusesEnum::APPROVED->value,
                    StatusesEnum::REJECTED->value,
                    // StatusesEnum::CANCELLED->value,
                    StatusesEnum::SYSTEM->value
                ]);
            });
        }

        if ($type == 'deal') {
            $statuses = [
                ['label' => 'Binded to Users', 'value' => StatusesEnum::HAS->value],
                ['label' => 'Not Binded to Users', 'value' => StatusesEnum::HASNOT->value],
            ];
        }

        if ($type == 'user_deal') {
            $statuses =  $collect->filter(function ($item) {
                return in_array($item->value, [
                    StatusesEnum::PENDING->value,
                    StatusesEnum::COMPLETED->value,
                    StatusesEnum::PROCESSING->value,
                    StatusesEnum::CANCELLED->value
                ]);
            });
        }

        if ($type == 'with_severity') {
            $statuses = $collect->map(function ($item) {
                return [
                    'name' => $item->value,
                    'severity' => $item->severity(),
                ];
            });
        }

        return isset($statuses) ? (is_array($statuses) ? $statuses : $statuses->toArray()) : $collect->map(fn($item) => $item->value)->toArray();
    }
}
