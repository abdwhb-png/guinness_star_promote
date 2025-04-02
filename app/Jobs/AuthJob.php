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
    protected $tries = 2;

    protected $ip;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(public CoLog $coLog, $ip = '')
    {
        $this->ip = $ip ?? request()->ip();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $info = $this->getLocation($this->ip);
        if ($info) {
            $coLog = CoLog::findOrFail($this->coLog->id);
            $coLog->update([
                'country' => $info->country_name ?? null,
                'city' => $info->city ?? null,
                'ip_address' => $this->ip,
            ]);
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
