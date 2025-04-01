<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Membership extends Model
{
    protected $guarded = [
        'id',
    ];

    protected $appends = ['image'];

    public function accounts(): HasMany
    {
        return $this->hasMany(UserAccount::class);
    }

    protected function image(): Attribute
    {
        $dir = 'app/assets/images/memberships/';

        return Attribute::make(
            get: fn() => $dir . $this->logo,
            set: fn() => $dir . $this->logo,
        );
    }
}
