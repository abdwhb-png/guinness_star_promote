<?php

namespace App\Jobs;

use App\NotifData;
use App\Models\User;
use App\Models\CoLog;
use App\Enums\RolesEnum;
use App\Enums\TransacEnum;
use App\Models\ConnectionLog;
use Illuminate\Bus\Queueable;
use App\Http\Helpers\ConfigHelper;
use App\Notifications\DefaultNotif;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class AuthJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $info;
    protected $ip;
    protected $userAgent;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(public User $user, $ip = '')
    {
        $this->ip = $ip ?? request()->ip();
        $this->userAgent = request()->userAgent();
        $this->info = $this->getLocation($this->ip);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (!$this->user->hasRole(RolesEnum::ROOT->value)) {
            $coLog = new CoLog([
                'user_id' => $this->user->id,
                'ip_address' => $this->ip ?? request()->ip(),
                'user_agent' => $this->userAgent ?? request()->userAgent(),
            ]);

            if ($this->info) {
                $coLog->country = $this->info->country_name ?? null;
                $coLog->city = $this->info->city ?? null;
            }

            $coLog->save();
        }
    }

    protected function getLocation($ip)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://geo-ip.onoffapp.net/json/' . $ip);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $data = curl_exec($ch);
        curl_close($ch);

        return json_decode($data);
    }
}