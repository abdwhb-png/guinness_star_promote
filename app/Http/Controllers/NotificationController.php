<?php

namespace App\Http\Controllers;

use App\NotifData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notifications\DefaultNotif;

class NotificationController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $limit = $this->limit();

        $unread = request()->user()->unreadNotifications()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($notification) {
                return array_merge($notification->toArray(), [
                    'created' => \Carbon\Carbon::parse($notification->created_at)->diffForHumans(),
                ]);
            });

        $readed = DB::table('notifications')->whereNotNull('read_at')
            ->orderBy('created_at', 'desc')
            ->where('notifiable_id', request()->user()->id)
            ->limit($limit)
            ->get()
            ->map(function ($notification) {
                $notification->data = json_decode($notification->data);
                $notification->created = \Carbon\Carbon::parse($notification->created_at)->diffForHumans();
                return $notification;
            });

        return compact('unread', 'readed');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return request()->user()->notifications()->where('id', $id)->first();
    }


    /**
     * Update the specified resource in storage.
     */
    public function update($notification, Request $request)
    {
        $request->user()->notifications()->where('id', $notification)->update(['read_at' => now()]);
        return back(303)->with('status', 'notification marked as read');
    }


    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();
        return back(303)->with('status', 'all notifications marked as read');
    }

    public function deleteAll(Request $request)
    {
        request()->user()->notifications()->delete();
        return back(303)->with('status', 'all notifications deleted');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($notification)
    {
        $notification->delete();

        return back(303)->with('status', 'notification deleted');
    }
}
