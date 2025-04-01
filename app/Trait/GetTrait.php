<?php

namespace App\Trait;

use App\Models\Deal;
use App\Models\User;
use Illuminate\Support\Arr;
use App\Trait\ResourceTrait;

trait GetTrait
{
    use ResourceTrait;

    protected function parseUserDeals(User $user)
    {
        return $user->getDeals()->map(function ($deal) {
            $deal->state = [
                'price' => $deal->pivot->price,
                'profit' => $deal->pivot->profit,
                'status' => $deal->pivot->status,
                'negative_balance' => $deal->pivot->frozen ?? 'none',
            ];

            $deal->dates = $this->parseDates($deal->pivot);

            return $deal;
        });
    }

    protected function parseUserVerbose($user): array
    {
        // Charger les relations nécessaires en une seule requête
        $user->load([
            'info',
            'roles',
        ]);

        $account = $user->account->withoutRelations()->toArray();

        $parsedAccount = array_merge($account, [
            'isFrozed' => $user->isFrozed(),
        ]);

        // Mise en cache des calculs
        $isSuperAdmin = $user->isSuperAdmin();
        $isAdmin = $user->isAdmin();
        $isRoot = $user->hasRole(\App\Enums\RolesEnum::ROOT->value);

        // Construction des données
        $result = array_merge($user->toArray(), [
            'invited_by' => $user->isInvitedBy(fullname: true),
            'account' => $parsedAccount,
            'full_address' => $user->info->fullAddress(),
            'payment_methods' => $user->getPMethods(),
            'isSuperAdmin' => $isSuperAdmin,
            'isAdmin' => $isAdmin,
            'isRoot' => $isRoot,
        ]);

        return $result;
    }

    protected function parseUserForAdmin(User $user, $deals = false): array
    {
        $detailedDeals = $user->detailedDeals();

        $results = [
            'id' => $user->id,

            'verbose' => $this->parseUserVerbose($user),

            'detail' =>
            array_merge(
                [
                    'email' => $user->email,
                    'invited_by' => $user->isInvitedBy(true) ?? 'unknown',
                    'total_balance' => number_format($user->account->balance, 2),
                    'frozen_balance' => number_format($user->account->frozen_balance, 2),
                ],
                $user->getInfos()->toArray()
            ),

            'deals' => $deals ? $this->parseUserDeals($user) : [],

            'deals_details' => [
                'counts' => $detailedDeals->counts,
                'status' => $detailedDeals->status,
                'current_deal' => $detailedDeals->current ? $detailedDeals->current->name : 'none'
            ],

            'more' => [
                'username' => $user->username,
                'all_info' => $user->info,
                'account' => $user->account,
                'wallets' => $user->getPMethods()->map(function ($wallet) {
                    return [
                        'symbol' => $wallet['method']->symbol,
                        'address' => $wallet['address'],
                    ];
                }),
            ],

            'dates' => $this->parseDates($user),

            'isSuperAdmin' => $user->isSuperAdmin(),
            'isAdmin' => $user->isAdmin(),
        ];

        return $results;
    }


    protected function parseDealForAdmin(Deal $deal): array
    {
        return [
            'id' => $deal->id,
            'category' => $deal->category,
            'name' => $deal->name,
            'image' => $deal->image,
            'detail' => [
                'name' => $deal->name,
                'description' => $deal->description,
                'address' => $deal->address,
                'price' => $deal->price,
                'price_range' => $deal->price_range,
            ],
            'with_users' => count($deal->getUsers()) > 0 ? 'has' : 'hasnot',
            'users' => $deal->getUsers(),
            'dates' => $this->parseDates($deal),
        ];
    }
}
