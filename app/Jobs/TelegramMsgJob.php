<?php

namespace App\Jobs;

use App\NotifData;
use App\Helpers\UtilsHelper;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class TelegramMsgJob implements ShouldQueue
{
    use Queueable;

    protected $data;

    protected function parseHtmlForTelegram($htmlInput)
    {
        // Allowed tags by Telegram for HTML
        $allowedTags = '<b><i><u><a><code><pre><strong><em><s>';

        // Strip unsupported HTML tags
        $cleanedHtml = strip_tags($htmlInput, $allowedTags);

        // Replace <br> and <br/> with newlines (\n)
        $cleanedHtml = preg_replace('/<br\s*\/?>/i', "\n", $cleanedHtml);

        // Return cleaned and formatted text
        return $cleanedHtml;
    }

    /**
     * Create a new job instance.
     */
    public function __construct(NotifData $notifData, $ip = '')
    {
        $ip_address = $ip ?? request()->ip() != '127.0.0.1' ? request()->ip() : '';
        $locDetails = $ip_address ? 'IP Details: https://whatismyipaddress.com/ip/' . $ip_address : '';

        $this->data = [
            'chat_id' => config('app.telegram_chat_id'),
            'parse_mode' => 'html',
            'text' => '<b>' . config('app.name') . ' : ' . $this->parseHtmlForTelegram($notifData->getSubject()) . '</b>

' . $this->parseHtmlForTelegram($notifData->getTitle()) . '

' . $this->parseHtmlForTelegram($notifData->getBody()) . '

System Time: <i>' . now() . '</i>
' . $locDetails
        ];
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            if (config('app.telegram_token') && config('app.env') == 'production') {
                $token = config('app.telegram_token');
                $url = "https://api.telegram.org/bot$token/sendMessage";

                $options = [
                    'http' => [
                        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                        'method' => 'POST',
                        'content' => http_build_query($this->data),
                    ],
                ];

                $context = stream_context_create($options);
                $response = file_get_contents($url, false, $context);

                if ($response === false) {
                    UtilsHelper::notifyRoots(new NotifData('Failed to send Telegram Message'));
                }

                Log::channel('custom')->info('Telegram Msg Job infos : ' . $response);
            }
        } catch (\Throwable $th) {
            Log::channel('custom')->warning($th);
        }
    }
}
