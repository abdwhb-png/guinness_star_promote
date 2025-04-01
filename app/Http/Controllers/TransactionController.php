<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Trait\ValidationRules;
use App\Http\Helpers\ConfigHelper;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BaseController;
use App\Http\Resources\TransactionResource;
use Illuminate\Validation\ValidationException;

class TransactionController extends BaseController
{
    use ValidationRules;


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return request()->user()->getTransactions();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $user = null)
    {
        $user = $user ?? $request->user();

        $validated = $request->validate($this->transactionRules());

        if ($validated['type'] == 'withdrawal' && $validated['amount'] > $user->account->balance) {
            throw ValidationException::withMessages([
                'amount' => 'Insufficient balance',
            ]);
        }

        DB::transaction(function () use ($validated, $user) {
            $transaction = new Transaction([
                'user_account_id' => $user->account->id,
                'type' => $validated['type'],
                'amount' =>  $validated['amount'],
                'method' => $validated['method'],
                'status' => 'pending',
            ]);
            $transaction->save();
        });

        return back(303)->with('status', 'Transaction created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate($this->transactionRules('update'));

        $transaction->update($validated);

        return back(303)->with('status', 'Transaction ' . $transaction->ref_id . ' status changed to' . $validated['status']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
