<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CoLog extends Model
{
    protected $guarded = [
        'id',
    ];

    public function scopeSearch(Builder $query, $search)
    {
        $query->where('ip_address', 'like', '%' . $search . '%')
            ->orWhere('country', 'like', '%' . $search . '%')
            ->orWhere('city', 'like', '%' . $search . '%')
            ->orWhereHas('user', fn($q) => $q->search($search));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
