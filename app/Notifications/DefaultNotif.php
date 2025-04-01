<?php

namespace App\Notifications;

use App\Jobs\TelegramMsgJob;
use App\NotifData;
use App\Models\User;
use Illuminate\Bus\Queueable;
use App\Mail\DefaultNotifMail;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class DefaultNotif extends Notification
{
    use Queueable;

    protected bool $sendTelegram;

    /**
     * Create a new notification instance.
     */
    public function __construct(public NotifData $notifData, public array $via = ['database', 'broadcast']) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $user = User::find($notifiable->id);
        if (site_setting('notif_on_telegram') && $user->isSuperAdmin()) {
            TelegramMsgJob::dispatch($this->notifData);
        }

        if (in_array('mail', $this->via) && $notifiable->account && !$notifiable->account->mail)
            return array_diff($this->via, ['mail']);

        return $this->via;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): \Illuminate\Mail\Mailable
    {
        return (new DefaultNotifMail($this->notifData))->to($notifiable->email);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return array_merge(
            ['via' => $this->via],
            $this->notifData->getData()
        );
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        $data = $this->notifData->getData();
        return (new BroadcastMessage($data))->onConnection('sync');
    }
}
