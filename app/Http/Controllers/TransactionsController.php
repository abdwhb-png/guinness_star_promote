<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Enums\TransacEnum;
use App\Jobs\ResetDealJob;
use App\Enums\StatusesEnum;
use App\Models\Transaction;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Trait\ValidationRules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Request as FacadesRequest;

class TransactionsController extends BaseController
{
    use ValidationRules;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(page_dir() . 'Transactions', [
            'filters' => FacadesRequest::all('search', 'type', 'sort'),
            'types' => TransacEnum::cases(),
            'can' => [
                'edit_transaction' => Auth::user()->isSuperAdmin(),
                'delete_transaction' => Auth::user()->isSuperAdmin(),
            ],
            'shouldNotEdit' => [
                StatusesEnum::SYSTEM->value,
                TransacEnum::BONUS->value,
                TransacEnum::COMMISSION->value,
            ],
            'transactions' => Transaction::filter(FacadesRequest::only('search', 'type', 'sort'))
                ->latest()
                ->paginate($this->perPage(50))
                ->withQueryString()
                ->through(fn($item) => [
                    ...Arr::only($item->toArray(), ['id', 'status', 'type', 'created_at', 'updated_at']),
                    'details' => [
                        'user' => $item->account?->user?->call_name,
                        'amount' => $item->amount . ' ' . $item->account->currency,
                        'method' => $item->method,
                        'ref_id' => $item->ref_id,
                    ],
                ]),
        ]);
    }

    public function destroy(Request $request)
    {
        $request->validate($this->transactionRules('delete'));

        $query = Transaction::whereDate('created_at', '>=', $request->start_date)
            ->whereDate('created_at', '<=', $request->end_date);

        $count = $query->count();
        $query->delete();

        return back(303)->with('status', $count . ' transactions deleted successfully from ' . $request->start_date . ' to ' . $request->end_date);
    }

    public function store(Request $request)
    {
        $request->validate([
            ...$this->transactionRules('create'),
            'user_id' => ['required', 'exists:users,id'],
            'reset_deals' => ['sometimes', 'boolean']
        ]);

        $user = User::findOrFail($request->user_id);

        if ($request->type == TransacEnum::WITHDRAWAL->value) {
            $transaction = Transaction::create([
                'user_account_id' => $user->account->id,
                'type' => $request->type,
                'amount' =>  $request->amount,
            ]);
            $transaction->update([
                'status' => StatusesEnum::APPROVED->value,
            ]);
        } else if ($request->type == TransacEnum::RECHARGE->value) {
            $transaction = $user->account->giveMoney($request->amount, $request->type);
        }

        if (!isset($transaction)) {
            throw ValidationException::withMessages([
                'error' => 'Transaction creation failed',
            ]);
        }

        defer(function () use ($user) {
            $account = $user->account->refresh();
            if ($account->canHaveDeals()) {
                ResetDealJob::dispatchSync(account: $account, reset: true);
            }
        });

        return back(303)->with('success', 'Transaction created successfully');
    }
}
