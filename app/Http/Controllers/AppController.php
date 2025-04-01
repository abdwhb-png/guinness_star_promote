<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function history()
    {
        return Inertia::render('User/History', [
            'transactions' => request()->user()->account->transactions,
        ]);
    }
}
