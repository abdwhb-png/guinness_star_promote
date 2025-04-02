<?php

namespace App\Trait;

use App\Models\User;
use App\Enums\RolesEnum;
use App\Enums\StatusesEnum;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;

trait UserTrait
{
    use ResourceTrait;

    public function isInvitedBy(bool $showFullName = false)
    {
        $user = User::find($this->invited_by);

        if (!$user) {
            return null;
        }

        return $showFullName ? $user->call_name : $user;
    }

    public function checkPassword(string $type, string $password): bool
    {
        $hasedPassword = $type == 'login' ? $this->password : $this->account->withdrawal_password;
        return Hash::check($password, $hasedPassword);
    }

    public function isAdmin(): bool
    {
        $roles = collect(RolesEnum::cases())->filter(function ($role) {
            return $role->value !== RolesEnum::USER->value;
        });

        return $this->hasRole($roles->pluck('value')->toArray());
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasRole([RolesEnum::SUPERADMIN->value, RolesEnum::ROOT->value]);
    }

    public function isFrozed(): bool
    {
        $account = $this->account;
        return isset($account->frozen_balance) && (float)$account->frozen_balance !== 0.0;
    }

    public function detailedDeals(): object
    {
        $account = $this->account;

        // Preload deals with pivot data to minimize repeated queries
        $deals = $account->deals()->withPivot(['status', 'frozen'])->get();
        // Group deals by status for efficient counting
        $groupedDeals = $deals->groupBy(fn($deal) => $deal->pivot->status);
        // Helper to safely get count from grouped deals
        $getCount = fn($status) => isset($groupedDeals[$status]) ? $groupedDeals[$status]->count() : 0;

        // Calculate counts
        $counts = [
            'total' => $deals->count(),
            'pending' => $getCount(StatusesEnum::PENDING->value),
            'processing' => $getCount(StatusesEnum::PROCESSING->value),
            'completed' => $getCount(StatusesEnum::COMPLETED->value),
            'cancelled' => $getCount(StatusesEnum::CANCELLED->value),
        ];

        // Separate deals based on frozen status
        $nonFrozenDeals = $deals->filter(fn($deal) => is_null($deal->pivot->frozen));
        $frozenDeals = $deals->filter(fn($deal) => !is_null($deal->pivot->frozen));

        // Determine if all deals are completed
        $allDone = $counts['total'] && $counts['total'] === $counts['completed'];

        // Get current deal (pending or cancelled)
        $currentDeal = $deals->first(fn($deal) => in_array($deal->pivot->status, [StatusesEnum::PENDING->value, StatusesEnum::CANCELLED->value]));

        return (object)[
            'counts' => $counts,
            'list' => [
                'all' => $deals,
                'non_frozed' => $nonFrozenDeals,
                'frozed' => $frozenDeals,
            ],
            'status' => [
                'all_done' => $allDone,
                'can_work' => $account->can_work === 1,
            ],
            'current' => $currentDeal,
        ];
    }


    public function canNotPerformDeal(): null | string
    {
        $detailledDeals = $this->account->detailedDeals();

        $error = null;

        if ($detailledDeals->counts['total'] < 1) {
            $detailledDeals = 'You dont have any deal right now ! Contact the customer service to get yours.';
        }

        if ($detailledDeals->status['all_done']) {
            $error = 'You have completed all the available deals !';
        }

        if (!$detailledDeals->status['can_work']) {
            $error = 'Your account cannot grab any deal right now ! Contact the customer service.';
        }

        if ($this->isFrozed()) {
            $error = 'You have a frozen balance. Please contact customer service to regularize your account !';
        }

        if ($this->account->balance <= 0) {
            $error = 'Your account balance is not enough to start. Please recharge your account.';
        }

        return $error;
    }

    // ////////////////////////////////////////
    // ////////////////////////////////////////
    // for resource
    // ////////////////////////////////////////
    // ////////////////////////////////////////

    protected function parseHistoryItem($item)
    {
        try {
            $item->created = $item->created_at->diffForHumans();
            $item->updated = $item->updated_at->diffForHumans();
            $item->date = $item->created_at->format('F d, Y');

            if ($item instanceof \App\Models\Transaction) {
                $item->text_amount = $this->account->currency . ' ' . $item->amount;
            } else {
                $item->text_amount = null;
            }
        } catch (\Exception $e) {
        }

        return $item;
    }


    public function getPMethods(): Collection
    {
        return $this->account->paymentMethods()->get()->map(function ($method) {
            return
                [
                    'id' => $method->pivot->id,
                    'type' => $method->type,
                    'owner' => $method->pivot->owner,
                    'phone_number' => $method->pivot->phone_number,
                    'address' => $method->pivot->address,
                    'method' => $method->withoutRelations(),
                ];
        });
    }

    public function getInfos()
    {
        return collect([
            'contact' => $this->info->phone_number,
            'first_name' => $this->info->first_name,
            'last_name' => $this->info->last_name,
            'gender' => $this->info->gender,
        ]);
    }

    public function getTransactions(): Collection
    {
        $transactions = $this->account->transactions()
            ->orderBy('created_at', 'desc')
            ->get();
        return $transactions->map(function ($item) {
            $item = $this->parseHistoryItem($item);

            if ($item->status == StatusesEnum::SYSTEM->value) {
                $item->status = StatusesEnum::APPROVED->value;
            }

            return $item;
        });
    }

    public function getDeals(): Collection
    {
        return $this->account->deals()->orderByPivot('created_at', 'desc')->get()->map(function ($item) {
            $item = $this->parseHistoryItem($item);
            $item->pivot = $this->parseHistoryItem($item->pivot);

            $detailedDeals = $this->account->detailedDeals();
            $item->is_current = $detailedDeals->current ? $detailedDeals->current->id === $item->id : false;
            // $item->is_current = $this->currentDeal  ? $this->currentDeal->id === $item->id : false;

            $item->pivot_id = $item->pivot->id;
            $item->status = $item->pivot->status;
            $item->pivot->negative_balance = $item->pivot->frozen ?? 'none';

            $item->state = [
                'price' => $item->pivot->price,
                'profit' => $item->pivot->profit,
                'status' => $item->pivot->status,
                'negative_balance' => $item->pivot->frozen ?? 'none',
            ];

            $item->dates = $this->parseDates($item->pivot);

            return $item;
        });
    }
}
