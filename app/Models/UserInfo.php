<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{

    protected $guarded = [
        'id',
    ];

    public function fullAddress(): string
    {
        $addressParts = array_filter([
            $this->address,
            $this->city,
            $this->state ? "{$this->state} ({$this->zip_code})" : null,
            $this->country,
        ]);

        return implode(', ', $addressParts);
    }
}
