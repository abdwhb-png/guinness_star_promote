<?php

namespace App\Contracts;

interface WithRefID
{
    public function refIDColumn(): string;

    public function refIDAttribute(): string;

    public static function generateUniqueRefID(): string;
}
