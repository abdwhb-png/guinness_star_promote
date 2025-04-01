<?php

namespace App\Http\Resources;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{

    public $collects = UserResource::class;

    public function __construct(public $withDeals)
    {
        parent::__construct($withDeals);
    }


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $results = [
            'id' => $this->id,

            'verbose' => Arr::except($this->toArray(request()), ['transactions', 'deals']),

            'detail' =>
            array_merge(
                [
                    'email' => $this->email,
                    'invited_by' => $this->isInvitedBy(fullname: true) ?? 'unknown',
                    'total_balance' => number_format($this->account->balance, 2),
                    'frozen_balance' => number_format($this->account->frozen_balance, 2),
                ],
                $this->getInfos()->toArray()
            ),

            'deals_details' => [
                'counts' => $this->account->detailedDeals()->counts,
                'status' => $this->account->detailedDeals()->status,
                'current_deal' => $this->currentDeal  ? $this->currentDeal->name : 'none'
            ],

            'more' => [
                'username' => $this->username,
                'all_info' => $this->info,
                'account' => $this->account->withoutRelations(),
                'wallets' => $this->getPMethods()->map(function ($wallet) {
                    return [
                        'symbol' => $wallet['method']->symbol,
                        'address' => $wallet['address'],
                    ];
                }),
            ],

            'dates' => $this->parseDates($this),

            'isSuperAdmin' => $this->isSuperAdmin(),
            'isAdmin' => $this->isAdmin(),
        ];

        if ($this->withDeals) {
            $results['deals'] = $this->getDeals()->map(function ($item) {
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

        return $results;
    }
}
