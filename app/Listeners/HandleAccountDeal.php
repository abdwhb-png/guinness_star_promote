<?php

namespace App\Listeners;

use App\NotifData;
use App\Enums\TransacEnum;
use App\Enums\StatusesEnum;
use App\Models\UserAccount;
use App\Events\AccountDealEvent;
use App\Services\RandomAllocator;
use App\Helpers\ConfigHelper;
use Illuminate\Support\Facades\DB;
use App\Notifications\DefaultNotif;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class HandleAccountDeal implements ShouldQueue
{
    protected $dataQuery;
    protected $tries = 5;

    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(AccountDealEvent $event): void
    {
        $pivotQuery = DB::table('deal_user_account')->where('id', $event->pivot_id)
            ->whereIn('status', [StatusesEnum::PROCESSING->value, StatusesEnum::CANCELLED->value]);

        if ($pivotQuery->exists()) {
            DB::transaction(function () use ($event, $pivotQuery) {
                $pivot = $pivotQuery->firstOrFail();

                // $profit = $this->getProfit($event->account, $event->pivot_id);
                $profit = $event->account->calculateDealProfit($pivot->price);

                if ($pivot->status == StatusesEnum::CANCELLED->value) {
                    $transac = $event->account->giveMoney(
                        amount: $pivot->frozen !== null ? $pivot->frozen * -1 : $profit,
                        type: TransacEnum::COMMISSION->value,
                        rejected: false
                    );
                } else {
                    $pivotQuery->update([
                        'profit' => $profit,
                        'status' => StatusesEnum::COMPLETED->value,
                    ]);

                    $transac = $event->account->giveMoney(
                        amount: $profit,
                        type: TransacEnum::COMMISSION->value,
                    );

                    // Decrement deposit from profit
                    $event->account->update([
                        'deposit' => $event->account->deposit - $profit
                    ]);

                    $this->notifyUser($event, $transac);
                }
            });
        }
    }

    protected function notifyUser($event, $transaction): void
    {
        $notifData = new NotifData('Deal completion commission received.');
        $notifData->setBody(
            'You have received ' . $transaction->textAmount() .
                ' commission for completing the task for: ' . $event->deal->name
        );

        $event->account->user->notify(new DefaultNotif($notifData));
    }

    protected function getProfit(UserAccount $account, int $id)
    {
        // Total à répartir
        $totalAmount = ConfigHelper::getProfitMaxOnFirst();

        if ($account->deal_reset_count <= 0) {
            $totalAmount = ConfigHelper::getProfitMaxOnFirst();
        } else {
            $totalAmount = $account->profit_max;
        }

        // Nombre d'itérations
        $iterations = $account->deals->count();

        // Initialiser l'allocateur
        $allocator = new RandomAllocator($totalAmount, $iterations);

        // Obtenir les montants générés
        $allocatedAmounts = $allocator->allocate();

        // Maper les résultats
        $totalGenerated = 0;
        $searchedAmount = 0;

        foreach ($allocatedAmounts as $index => $amount) {
            $totalGenerated += $amount;
            $deal = $account->deals->toArray()[$index];

            if ($deal['pivot']['id'] === $id) {
                $searchedAmount = $amount;
            }
        }

        return $searchedAmount;
    }
}
