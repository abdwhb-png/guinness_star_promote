<?php

namespace App\Observers;

use App\Models\User;
use App\Models\UserInfo;
use App\Events\UserEvent;
use App\Models\UserAccount;
use Illuminate\Support\Str;
use App\Jobs\RegistrationJob;

class UserObserver
{
    /**
     * Méthode centralisée pour déclencher l'événement.
     */
    private function triggerEvent(User $user, string $eventType): void
    {
        event(new UserEvent($user, $eventType));
    }

    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        UserAccount::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'account_no' => strtoupper(substr(Str::uuid(), 0, 8)),
            ]
        );

        UserInfo::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'phone_number' => $user->phone,
            ]
        );

        if (site_setting('enable_welcome_bonus')) {
            $transac = $user->account->giveMoney(\App\Helpers\ConfigHelper::getWelcomeBonus(), \App\Enums\TransacEnum::BONUS->value);
        }
        $bonus = $transac?->textAmount() ?? null;

        // dispatch registration job
        RegistrationJob::dispatch($user->id, $bonus);

        // trigger user Event
        $this->triggerEvent($user, 'user-created');
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        // Vérifier des changements spécifiques si nécessaire
        if ($user->wasChanged('roles')) {
            // Par exemple : envoyer une notification
        }

        if ($user->wasChanged('permissions')) {
            // Par exemple : gérer les permissions
        }

        $this->triggerEvent($user, 'user-updated');
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        $this->triggerEvent($user, 'user-deleted');
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        $this->triggerEvent($user, 'user-restored');
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        $this->triggerEvent($user, 'user-force-deleted');
    }
}
