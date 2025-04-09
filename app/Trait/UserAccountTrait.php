<?php

namespace App\Trait;

use App\Enums\StatusesEnum;
use App\Models\Transaction;
use App\Helpers\ConfigHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait UserAccountTrait
{
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

    public function canHaveDeals() : bool
    {
        return $this->deposit > 0 && $this->user->detailedDeals()->status['all_done'];
    }
    
    // public function isFrozed(): bool
    // {
    //     return $this->user->isFrozed();
    // }

    // public function detailedDeals(): object
    // {
    //     return $this->user->detailedDeals();
    // }

    // public function canNotPerformDeal(): null | string
    // {
    //     return $this->user->canNotPerformDeal();
    // }

    public function calculateDealProfit($price): float
    {
        $ratio = $this->profit_ratio / 100;
        if ($price <= 0 || $price === null) {
            $price = $this->deposit;
        }
        return $price * $ratio;
    }

    public function giveMoney($amount, $type, $rejected = false): Transaction
    {
        $data = [
            'type' => $type,
            'amount' => $amount,
            'status' => $rejected ? StatusesEnum::REJECTED->value : StatusesEnum::SYSTEM->value,
        ];

        $transaction = new Transaction($data);
        $this->transactions()->save($transaction);

        return $transaction;
    }
}
