<?php

namespace App\Console\Commands;

use App\Helpers\UtilsHelper;
use App\Jobs\ResetDealJob;
use App\Models\UserAccount;
use App\NotifData;
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

        $count = 0;
        UserAccount::whereNotNull('deposit')->get()->each(function ($account) use (&$count) {
            if ($account->deposit > 0 && $account->user->detailedDeals()->status['all_done']) {
                $this->info("Granting deals to user {$account->user->call_name}...");
                ResetDealJob::dispatch($account);
                $count++;
            }
        });


        $notifData = new NotifData($count . ' users have been granted daily new deals');
        $notifData->setSubject('Automatic deals reset');
        $notifData->setBody('Users that have been granted deals are users with deposit and precedent deals completed.');
        UtilsHelper::notifyAdmins($notifData);

        $this->info("$count users have been granted daily new deals.");
    }
}
