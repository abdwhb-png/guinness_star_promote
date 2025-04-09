<?php

namespace App\Http\Resources;

use Illuminate\Support\Arr;
use App\Trait\ResourceTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Enums\RolesEnum;

class UserResource extends JsonResource
{
    use ResourceTrait;

    protected $detailedDeals;
    protected $currentDeal;

    public function __construct($resource)
    {
        parent::__construct($resource);

        $this->detailedDeals = $resource->detailedDeals();
        $this->currentDeal = $this->detailedDeals->current;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $result =  [
            ...parent::toArray($request),
            'invited_by' => $this->isInvitedBy(true),
            'account' => [
                ...$this->account->withoutRelations()->toArray(),
                'isFrozed' => $this->isFrozed(),
                'balance' => $this->account->balance,
            ],
            'payment_methods' => $this->getPMethods(),
            'info' => $this->info->withoutRelations(),
            'full_address' => $this->info->fullAddress(),

            // 'transactions' => $this->getTransactions(),
            // 'deals' => $this->getDeals(),

            'roles' => $this->roles,

            'isSuperAdmin' => $this->isSuperAdmin(),
            'isAdmin' => $this->isAdmin(),
            'isRoot' => $this->hasRole(RolesEnum::ROOT->value),
        ];

        $except = $this->hasRole('user') ? ['roles', 'permissions', 'invited_by', 'isSuperAdmin', 'isAdmin', 'isRoot'] : [];

        return Arr::except($result, $except);
    }
}
