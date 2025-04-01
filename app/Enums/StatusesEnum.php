<?php

namespace App\Enums;

enum StatusesEnum: string
{
        // case NAMEINAPP = 'name-in-database';

    case APPROVED = 'approved';
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case REJECTED = 'rejected';
    case SYSTEM = 'system';
    case COMPLETED = 'completed';
    case CANCELLED = 'canceled';
    case HAS = 'has';
    case HASNOT = 'hasnot';

    public function severity(): string
    {
        return match ($this) {
            static::APPROVED => 'success',
            static::PENDING => 'warn',
            static::REJECTED => 'danger',
            static::SYSTEM => 'info',
            default => 'secondary',
        };
    }
}
