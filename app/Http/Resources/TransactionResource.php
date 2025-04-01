<?php

namespace App\Http\Resources;

use App\Trait\ResourceTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    use ResourceTrait;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    public function forAdmin(): array
    {
        $amount = $this->type == 'withdrawal' ?  -1 * $this->amount : $this->amount;
        return
            [
                'id' => $this->id,
                'ref_id' => $this->ref_id,
                'status' => $this->status,
                'type' => $this->type,
                'detail' => [
                    'user' => $this->account->user ? $this->account->user->username : 'unknown',
                    'amount' => $amount . ' ' . $this->account->currency,
                    'method' => $this->method,
                ],
                'dates' => $this->parseDates($this),
            ];
    }
}
