<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('App.Models.User.Account.{accountId}', function ($user, $accountId) {
    return (int) $user->account->id === (int) $accountId;
});

Broadcast::channel('App.Models.User.Info.{infoId}', function ($user, $infoId) {
    return (int) $user->info->id === (int) $infoId;
});

Broadcast::channel('App.Models.Transaction.{accountId}', function ($user, $accountId) {
    return (int) $user->account->id === (int) $accountId;
});

Broadcast::channel('App.Models.Deal.{accountId}', function ($user, $accountId) {
    return (int) $user->account->id === (int) $accountId;
});

Broadcast::channel('users', function ($user) {
    return  $user->isAdmin();
});

Broadcast::channel('transactions', function ($user) {
    return  $user->isAdmin();
});

Broadcast::channel('deals', function ($user) {
    return  $user->isAdmin();
});
