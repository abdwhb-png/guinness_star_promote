<?php

namespace App\Jobs;

use App\NotifData;
use App\Models\User;
use App\Enums\RolesEnum;
use App\Enums\TransacEnum;
use App\Helpers\ConfigHelper;
use App\Helpers\UtilsHelper;
use App\Notifications\DefaultNotif;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class RegistrationJob implements ShouldQueue
{
    use Queueable;

    protected $user;

    /**
     * Create a new job instance.
     */
    public function __construct(int $id, public $bonus = null)
    {
        $this->user = User::find($id);
        if ($referer = User::find($this->user->invited_by) && site_setting('enable_referral_bonus')) {
            // notify referer about referral bonus
            $transac = $referer->account->giveMoney(ConfigHelper::getWelcomeBonus(), TransacEnum::BONUS->value);

            $notifData = new NotifData('Referral bonus for you');
            $notifData->setBody('You have received a referral bonus of ' . $transac->textAmount() . ' from ' . $this->user->call_name . ' registration.');
            $notifData->setSubject('New referral bonus');
            $this->user->notify(new DefaultNotif($notifData));
        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->user && $this->user->hasRole(RolesEnum::USER->value)) {
            // assign user direct permissions
            $this->user->givePermissionTo(\App\Enums\PermissionsEnum::INVITEUSERS);

            if ($this->bonus) {
                // notify about welcome bonus
                $notifData = new NotifData('Welcome bonus for you');
                $notifData->setBody('You have received a registration bonus of ' . $this->bonus);
                $notifData->setSubject('We are happy to have you on board');
                $this->user->notify(new DefaultNotif($notifData));
            }

            // notify super-admins about new user
            $notifData = new NotifData("New account created");
            $notifData->setBody($this->user->call_name . " has created a new account.");
            $notifData->setSubject("Account creation notification");

            UtilsHelper::notifySuperAdmins($notifData);
        }
    }
}
