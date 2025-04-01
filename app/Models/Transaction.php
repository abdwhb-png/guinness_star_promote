<?php

namespace App\Models;

use App\Trait\HasRefID;
use App\Contracts\WithRefID;
use App\Enums\StatusesEnum;
use App\Events\TransactionEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Transaction extends Model implements WithRefID
{
    use HasRefID;

    protected $guarded = [
        'id',
    ];

    static function booted()
    {
        static::created(function ($transaction) {
            event(new TransactionEvent($transaction, 'created'));
        });

        static::updated(function ($transaction) {
            event(new TransactionEvent($transaction, 'updated'));
        });
    }

    public function refIDAttribute(): string
    {
        return 'ref_id';
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(UserAccount::class, 'user_account_id');
    }

    public function scopePendingFirst($query)
    {
        return $query->orderByRaw("CASE WHEN status = '" . StatusesEnum::PENDING->value . "' THEN 0 ELSE 1 END")
            ->orderBy('created_at', 'desc');
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('ref_id', 'like', '%' . $search . '%')
                ->orWhere('status', 'like', '%' . $search . '%')
                ->orWhere('amount', 'like', '%' . $search . '%')
                ->orWhere('method', 'like', '%' . $search . '%')
                ->orWhereHas('account', fn($q) => $q->whereHas('user', fn($q) => $q->search($search)));
        })->when($filters['type'] ?? null, function ($query, $type) {
            $query->where('type', $type);
        })->when($filters['sort'] ?? null, function ($query, $sort) {
            $query->orderBy($sort['field'], $sort['order']);
        });
    }

    public function textAmount(): string
    {
        return '$ ' . $this->amount . ' ' . $this->account->currency;
    }
}
