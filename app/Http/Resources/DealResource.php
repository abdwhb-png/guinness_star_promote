<?php

namespace App\Http\Resources;

use App\Trait\ResourceTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DealResource extends JsonResource
{
    use ResourceTrait;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'total_reviews' => $this->reviews()->count(),
            'isLiked' => $this->likers()->where('user_accounts.id', $request->user()->account->id)->exists(),
        ]);
    }


    public function forAdmin(): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
            'name' => $this->name,
            'image' => $this->image,
            'detail' => [
                'name' => $this->name,
                'description' => $this->description,
                'address' => $this->address,
                'price' => $this->price,
                'price_range' => $this->price_range,
            ],
            'with_users' => count($this->getUsers()) > 0 ? 'has' : 'hasnot',
            'users' => $this->getUsers(),
            'dates' => $this->parseDates($this),
        ];
    }
}
