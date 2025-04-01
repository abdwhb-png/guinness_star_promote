<?php

namespace App\Models;

use App\Enums\StatusesEnum;
use App\Events\NewTransactionEvent;
use Illuminate\Support\Str;
use App\Events\UserAccountEvent;
use App\Helpers\ConfigHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UserAccount extends Model
{
    protected $silent = false;

    protected $guarded = [
        'id',
    ];

    protected $appends = ['pending_profit'];

    protected $hidden = [
        'withdrawal_password',
    ];

    static function booted()
    {
        static::creating(function ($item) {
            $item->account_no = strtoupper(substr(Str::uuid(), 0, 8));
        });

        static::created(function ($account) {
            PaymentMethod::all()->each(function ($paymentMethod) use ($account) {
                $account->paymentMethods()->attach($paymentMethod->id);
            });
        });

        static::updated(function ($account) {
            event(new UserAccountEvent($account->withoutRelations(), 'updated', 'account'));
        });
    }

    public function balance(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->deposit + $this->profit ?? 0.00,
        );
    }

    public function pendingProfit(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->processingDeals()->sum('profit');
            },
        );
    }

    public function profitRatio(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ?? ConfigHelper::getProfitRatio(),
        );
    }

    public function maxDeals(): Attribute
    {
        $membership = $this->membership;
        return Attribute::make(
            get: fn($value) => $value ?? ($membership ? $membership->max_tasks : ConfigHelper::getMaxDeals()),
        );
    }

    public function profitMax(): Attribute
    {
        $membership = $this->membership;
        return Attribute::make(
            get: fn($value) => $value ?? ($membership ? $membership->max_gain : ConfigHelper::getProfitMaxOnFirst()),
        );
    }

    public function membership(): BelongsTo
    {
        return $this->belongsTo(Membership::class);
    }

    public function deals(): BelongsToMany
    {
        return $this->belongsToMany(Deal::class)->withPivot('status', 'price', 'profit', 'frozen', 'message', 'id')->withTimestamps();
    }

    public function processingDeals(): BelongsToMany
    {
        return $this->belongsToMany(Deal::class)->wherePivot('status', StatusesEnum::PROCESSING->value)->withPivot('status', 'price', 'profit', 'frozen', 'id')->withTimestamps();
    }

    public function favoriteDeals(): BelongsToMany
    {
        return $this->belongsToMany(Deal::class, 'favorite_deals')->withTimestamps();
    }

    public function paymentMethods(): BelongsToMany
    {
        return $this->belongsToMany(PaymentMethod::class)->where('status', true)->withPivot('id', 'owner', 'phone_number', 'address')->withTimestamps();
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function giveMoney($amount, $type, $rejected = true): Transaction
    {
        $data = [
            'type' => $type,
            'amount' => $amount,
            'status' => $rejected ? StatusesEnum::SYSTEM->value : StatusesEnum::REJECTED->value,
        ];

        $transaction = new Transaction($data);
        $this->transactions()->save($transaction);

        return $transaction;
    }

    public function isFrozed(): bool
    {
        return $this->user->isFrozed();
    }


    public function detailedDeals(): object
    {
        return $this->user->detailedDeals();
    }


    public function canNotPerformDeal(): null | string
    {
        return $this->user->canNotPerformDeal();
    }
}
