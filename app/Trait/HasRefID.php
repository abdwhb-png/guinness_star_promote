<?php

namespace App\Trait;

use App\Contracts\WithRefID;
use Illuminate\Support\Str;

trait HasRefID
{
    public function refIDColumn(): string
    {
        return 'ref_id';
    }

    public static function generateUniqueRefID(): string
    {
        return Str::uuid();
    }

    protected static function bootHasRefID(): void
    {
        self::creating(function (WithRefID $model) {
            $model->{$model->refIDColumn()} = static::generateUniqueRefID($model->{$model->refIDAttribute()});
        });
    }
}
