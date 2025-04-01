<?php

namespace App\Enums;

enum WalletsEnum: string
{
    // case NAMEINAPP = 'name-in-database';

    case BITCOIN = 'Bitcoin';
    case ETHEREUM = 'Ethereum';
    case USDTTRC20 = 'Tether (TRC20)';
    case USDTERC20 = 'Tether (ERC20)';
    case MTNMOMO = 'MTN Momo';
    case OM = 'OM';

    public static function all(): array
    {
        return collect(self::cases())->map(fn($case) => [
            'label' => $case->value,
            'name' => $case->name(),
            'symbol' => $case->symbol(),
            'type' => $case->type(),
            'img' => $case->img(),
        ])->toArray();
    }

    public function name(): string
    {
        return match ($this) {
            static::MTNMOMO => 'MTN Mobile Money',
            static::OM => 'Orange Money',
            static::BITCOIN => 'Bitcoin',
            static::ETHEREUM => 'Ethereum',
            static::USDTTRC20 => 'Tether (TRC20)',
            static::USDTERC20 => 'Tether (ERC20)',
        };
    }

    public function symbol()
    {
        return match ($this) {
            static::BITCOIN => 'BTC',
            static::ETHEREUM => 'ETH',
            static::USDTTRC20 => 'USDT-TRC20',
            static::USDTERC20 => 'USDT-ERC20',
            default => null,
        };
    }

    public function type()
    {
        return match ($this) {
            static::OM => 'momo',
            static::MTNMOMO => 'momo',
            static::ETHEREUM => 'crypto',
            static::BITCOIN => 'crypto',
            static::USDTTRC20 => 'crypto',
            static::USDTERC20 => 'crypto',
            default => null,
        };
    }

    public function img()
    {
        return match ($this) {
            static::OM => '/payment_methods/om.png',
            static::MTNMOMO => '/payment_methods/mtn_momo.png',
            default => null,
        };
    }
}
