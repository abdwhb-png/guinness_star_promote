<?php

namespace App\Events;

use App\Models\Transaction;
use Illuminate\Support\Facades\Log;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;

class TransactionEvent implements ShouldDispatchAfterCommit, ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;

    /**
     * Create a new event instance.
     */
    public function __construct(public Transaction $transaction, public string $state = '')
    {
        $this->user = $transaction->account->user;

        if ($state == 'updated') {
            event(new UserAccountEvent($transaction->account->withoutRelations(), 'updated', 'transaction'));
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
            new PrivateChannel('App.Models.Transaction.' . $this->transaction->user_account_id),
            new PrivateChannel('transactions'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'TransactionEvent';
    }

    public function broadcastWith(): array
    {
        return [
            'state' => $this->state,
            'transaction' => $this->transaction,
        ];
    }
}
