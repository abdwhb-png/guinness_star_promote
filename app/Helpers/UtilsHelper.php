<?php

namespace App\Helpers;

use App\NotifData;
use App\Models\User;
use App\Enums\RolesEnum;
use App\Models\UserAccount;
use App\Jobs\TelegramMsgJob;
use App\Notifications\DefaultNotif;
use Illuminate\Support\Facades\Notification;

class UtilsHelper
{
    static public function notifyAdmins(NotifData $notifData)
    {
        $users = User::role(RolesEnum::ADMIN->value)->get();
        Notification::send($users, new DefaultNotif($notifData));
        self::notifySuperAdmins($notifData);
    }

    static public function notifySuperAdmins(NotifData $notifData)
    {
        $superAdmins = User::role(RolesEnum::SUPERADMIN->value)->get();
        Notification::send($superAdmins, new DefaultNotif($notifData));
        self::notifyRoots($notifData);

        if (site_setting("telegram")) {
            TelegramMsgJob::dispatchSync($notifData);
        }
    }


    static public function notifyRoots(NotifData $notifData)
    {
        $roots = User::role(RolesEnum::ROOT->value)->get();
        Notification::send($roots, new DefaultNotif($notifData));
    }


    static public function parseArrayToTextTelegram($var): string
    {
        if (is_array($var)) {
            $text = '';
            foreach ($var as $key => $value) {
                $text = $text . '
                ' . $key . ' = ' . self::parseArrayToTextTelegram($value) . '   ';
            }
            return $text;
        }
        return $var;
    }


    public static function generateAccountNo()
    {
        do {
            // Generate a random 9-digit number
            $number = random_int(100000000, 999999999); // Ensures the number is 9 digits
        } while (UserAccount::where('account_no', $number)->exists()); // Check for uniqueness

        return $number; // Return the unique number
    }


    public static function formatAmount($amount): string
    {
        return number_format($amount, 6);
    }
}
