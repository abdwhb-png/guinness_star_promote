<?php

namespace App\Mail;

use App\NotifData;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Http\Helpers\ConfigHelper;
use App\Http\Helpers\RequestHelper;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class DefaultNotifMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $tries = 10;
    protected $url;
    public $subject;

    /**
     * Create a new message instance.
     */
    public function __construct(public NotifData $notifData)
    {
        $this->afterCommit();
        $this->onQueue('emails');

        $this->subject = $this->notifData->getSubject() != '' ? $this->notifData->getSubject() : 'New notification from ' . config('app.name');
        $this->url = config('app.url');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.defaut-notif',
            with: [
                'title' => $this->notifData->getTitle(),
                'body' => $this->notifData->getBody(),
                'url' => $this->url,
                'btn_text' => ConfigHelper::isAdminDomain(request()) ? 'Dashboard' : 'My Account',
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
