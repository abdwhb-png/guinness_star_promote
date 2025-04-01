<?php

namespace App\Console\Commands;

use App\Jobs\ResetDealJob;
use App\Models\UserAccount;
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
        UserAccount::whereNotNull('deposit')->get()->each(function ($account) {
            ResetDealJob::dispatchSync($account);
        });
    }
}
