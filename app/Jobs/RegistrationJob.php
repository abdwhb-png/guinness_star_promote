<?php

namespace App\Jobs;

use App\NotifData;
use App\Models\User;
use App\Enums\RolesEnum;
use App\Enums\TransacEnum;
use App\Helpers\ConfigHelper;
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
            $notifData->setBody($this->user->username . " has created a new account : " . $this->user->email);
            $notifData->setSubject("Account creation message");

            \App\Http\Helpers\UtilsHelper::notifySuperAdmins($notifData);
        }
    }
}
