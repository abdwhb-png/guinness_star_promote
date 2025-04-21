<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PaymentMethod extends Model
{
    protected $guarded = [
        'id',
    ];

    protected $appends = [
        'image_url',
    ];

    public function imageUrl(): Attribute
    {
        return Attribute::make(
            // get: fn() => $this->img ? (config('app.env') == 'local' ? url('storage' . $this->img) : Storage::url($this->img)) : null,
            get: fn() => $this->img ? (config('app.env') == 'local' ? url('storage' . $this->img) : asset($this->img)) : null,
        );
    }

    public function userAccounts(): BelongsToMany
    {
        return $this->belongsToMany(UserAccount::class)->withPivot('id', 'owner', 'phone_number', 'address')->withTimestamps();
    }
}
