<?php

namespace App\Events;

use App\Models\Deal;
use App\Models\Review;
use App\Models\UserAccount;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AccountDealEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Deal $deal;

    /**
     * Create a new event instance.
     */
    public function __construct(public UserAccount $account, public int $pivot_id, $reviewData = [])
    {
        $this->deal = $account->deals()->wherePivot('id', $pivot_id)->firstOrFail();

        if (count($reviewData) && $this->deal) {
            $review = Review::create([
                'rating' => $reviewData['rating'] ?? rand(1, 5),
                'comment' => $reviewData['comment'] ?? null,
                'reviewer' => $account->user->username,
            ]);

            $review->deals()->attach($this->deal->id);
        }
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
