<?php

namespace App\Listeners;

use App\Enums\StatusesEnum;
use App\Enums\TransacEnum;
use App\NotifData;
use App\Models\Transaction;
use App\Models\UserAccount;
use App\Events\TransactionEvent;
use App\Events\UserAccountEvent;
use App\Helpers\UtilsHelper;
use App\Notifications\DefaultNotif;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class TransactionListener
{

    public function __construct()
    {
        // Constructor for TransactionListener. Currently empty.
    }


    protected function recharge(Transaction $transaction, $account): bool
    {
        return  $account->increment('deposit', $transaction->amount);
    }


    protected function makeWithdrawal(Transaction $transaction, $account): bool
    {
        $amount = $transaction->amount;

        if ($amount > $account->balance) {
            $transaction->status = StatusesEnum::CANCELLED->value;
            $transaction->save();

            $adminNotifData = new NotifData('Transaction <b>' . $transaction->ref_id . '</b> has been cancelled');
            $adminNotifData->setSubject("Transaction Cancelled");
            $adminNotifData->setBody("The user balance is less than the transaction amount at the moment." .
                "<br>Balance: " . $account->balance . "<br>Transaction Amount: " . $transaction->textAmount());

            UtilsHelper::notifySuperAdmins($adminNotifData);

            return false;
        }

        if ($amount > $account->profit) {
            $rest = $amount - $account->profit;
            $ok = $account->update([
                'profit' => 0,
                'deposit' => $account->deposit - $rest ?? 0,
            ]);
        } else {
            $ok = $account->decrement('profit', $amount);
        }

        return $ok;
    }


    protected function actionBasedOnType($transaction, $notifData = null): string
    {
        $account = $transaction->account;

        $msg = '';

        if ($transaction->type == TransacEnum::WITHDRAWAL->value) {
            \Log::info('Withdrawal transaction', ['transaction' => $transaction]);
            if ($this->makeWithdrawal($transaction, $account)) {
                $msg = "We have successfully processed your withdrawal request for " . $transaction->textAmount() . ".";
                \Log::info('Withdrawal transaction successful : ' . $msg);
            }
        }

        if ($transaction->type == TransacEnum::RECHARGE->value) {
            if ($this->recharge($transaction, $account)) {
                $msg = "We have successfully processed your recharge for " . $transaction->textAmount() . ".";
            }
        }

        if ($transaction->type == TransacEnum::COMMISSION->value) {
            if ($account->updateQuietly(['profit' => $account->profit + $transaction->amount])) {
                $msg = "You have received a " . $transaction->type . " of " . $transaction->textAmount() . ".";
                event(new UserAccountEvent($account, 'updated', 'commission'));
            }
        }

        if ($transaction->type == TransacEnum::BONUS->value) {
            if ($account->increment('deposit', $transaction->amount)) {
                $msg = "You have received a " . $transaction->type . " of " . $transaction->textAmount() . ".";
            }
        }

        return $msg;
    }


    protected function handleCreated(Transaction $transaction, UserAccount $account)
    {
        $user = $account->user;

        if ($transaction->status == StatusesEnum::PENDING->value) {
            $adminNotifData = new NotifData($user->username . ' submited a ' . $transaction->type . ' of <b>' . $transaction->textAmount() . '</b>');
            $adminNotifData->setSubject("New " . $transaction->type . " transaction");
            $adminNotifData->setBody("<b>Method</b>: " . $transaction->method . "<br><b>Ref ID</b>: " . $transaction->ref_id);

            UtilsHelper::notifySuperAdmins($adminNotifData);
        }
    }


    protected function handleUpdated(Transaction $transaction, UserAccount $account)
    {
        $user = $account->user;

        $titleStart = 'Your ' . $transaction->type;
        $titleEnd = "TraceID " . $transaction->ref_id;

        if ($transaction->type == 'withdrawal' || $transaction->type == 'recharge') {
            $titleStart = $transaction->type == 'withdrawal' ? "Account Payout" : "Account Recharge";
        }

        $title = $titleStart . " - " . $account->currency . " - " . $titleEnd;

        $notifData = new NotifData($title);

        $notifData->setSubject("Transaction :" . $transaction->ref_id . " " . $transaction->status);

        if ($transaction->status == StatusesEnum::APPROVED->value) {
            $msg = $this->actionBasedOnType($transaction, $notifData);
            $notifData->setBody($msg);
        }

        if ($transaction->status == StatusesEnum::REJECTED->value) {
            $notifData->setBody("Your " . $transaction->type . " transaction of " . $transaction->textAmount() . " has been rejected");
        }

        // Send the notification if both title and body are set.
        if ($notifData->getTitle() && $notifData->getBody()) {
            $user->notify(new DefaultNotif($notifData));
        }
    }


    public function handle(TransactionEvent $event): void
    {
        $transaction = $event->transaction;
        $account = $transaction->account;

        // Handle the transaction based on its state.

        if ($event->state == 'created') {
            $this->handleCreated($transaction, $account);

            if ($transaction->status == StatusesEnum::SYSTEM->value) {
                $this->actionBasedOnType($transaction);
            }
        }

        if ($event->state == 'updated') {
            $this->handleUpdated($transaction, $account);
        }
    }
}