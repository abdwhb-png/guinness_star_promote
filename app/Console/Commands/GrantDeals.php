<?php

namespace App\Console\Commands;

use App\NotifData;
use App\Models\User;
use App\Enums\RolesEnum;
use App\Jobs\ResetDealJob;
use App\Models\UserAccount;
use App\Helpers\UtilsHelper;
use Illuminate\Console\Command;

class GrantDeals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'grant:deals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Grant deals to all eligible users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting grant:deals command...');

        $allCount = User::role(RolesEnum::USER->value)->whereHas('account')->count();
        $this->info("Total users account found: $allCount");

        $count = 0;
        UserAccount::whereNotNull('deposit')->get()->each(function ($account) use (&$count) {
            if ($account->canHaveDeals()) {
                $this->info("Granting deals to user {$account->user->call_name}...");
                ResetDealJob::dispatch($account);
                $count++;
            }
        });

        $notifData = new NotifData($count . ' users have been granted daily new deals');
        $notifData->setSubject('Automatic deals reset');
        $notifData->setBody('Users that have been granted deals are users with deposit > 0 & no current deals or precedent deals completed.');
        UtilsHelper::notifyAdmins($notifData);

        $this->info("$count users have been granted daily new deals.");
    }
}
