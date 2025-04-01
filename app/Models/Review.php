<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Review extends Model
{
    protected $guarded = [
        'id',
    ];

    public function deals(): BelongsToMany
    {
        return $this->belongsToMany(Deal::class)->withTimestamps();
    }
}
