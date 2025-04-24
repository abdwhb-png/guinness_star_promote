<?php

namespace App\Http\Controllers;

use App\NotifData;
use App\Models\Deal;
use App\Models\User;
use App\Trait\GetTrait;
use App\Enums\StatusesEnum;
use Illuminate\Support\Arr;
use App\Helpers\UtilsHelper;

use Illuminate\Http\Request;
use App\Trait\ValidationRules;
use App\Events\AccountDealEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Notifications\DefaultNotif;
use App\Http\Resources\DealResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class DealController extends BaseController
{
    use ValidationRules, GetTrait;

    protected function uploadPhoto(Request $request)
    {
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            return $file->store('deals', 'public');
        }

        return null;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $itemsPerPage = $this->perPage();
        $page = $this->currentPage();
        $limit = $this->limit(20);

        $cacheKey = 'deals' . md5($limit . '' . $itemsPerPage);
        $cacheExpires = 60 * 5; // 5 minutes

        $deals = Cache::remember($cacheKey, $cacheExpires, function () use ($limit) {
            return Deal::inRandomOrder()->limit($limit)->get()->mapInto(DealResource::class);
        });

        $paginated = $this->paginate($deals, $itemsPerPage, $page);

        return $paginated;
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->dealRules('store'));
        if ($request->hasFile('photo')) {
            $validated['img_path'] = $this->uploadPhoto($request);
        }
        $deal = Deal::create($validated);

        return back(303)->with('status', 'Deal ' . $deal->name . ' created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Deal $deal, Request $request)
    {
        $validated = $request->validate($this->dealRules('update'));
        if ($request->hasFile('photo')) {
            $validated['img_path'] = $this->uploadPhoto($request);
        }
        $deal->update(Arr::except($validated, 'photo'));

        return back(303)->with('status', 'Deal' . $deal->name . ' updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deal $deal)
    {
        if ($deal->accounts->count()) {
            throw ValidationException::withMessages([
                'deal' => 'Cannot delete deal that has users associated with it',
            ]);
        } else {
            $deal->delete();
            return back(303)->with('status', 'Deal deleted successfully');
        }
    }

    public function like(Request $request, Deal $deal)
    {
        $request->validate(['status' => 'required|in:like,unlike']);

        if ($request->status == 'like') {
            $deal->likers()->attach($request->user()->account->id);
        } else {
            $deal->likers()->detach($request->user()->account->id);
        }

        return response(['status' => 'success'], 200);
    }

    protected function pivotQuery(int $accountId, int $pivotId)
    {
        return DB::table('deal_user_account')->where('id', $pivotId)
            ->where('user_account_id', $accountId);
    }

    public function deal(): JsonResponse
    {
        $user = request()->user();
        $detailedDeals = $user->detailedDeals();
        $deposit = $user->account->deposit;
        $error = null;

        if (!$deposit || $deposit <= 0) {
            $error = __('messages.insufficient_funds');
        } else if (!$user->account->can_work) {
            $error = __('messages.can_not_work');
        } else if (!$detailedDeals->counts['pending'] && !$detailedDeals->status['all_done']) {
            $error = __('messages.no_deal_available');
        } else if ($detailedDeals->status['all_done']) {
            $error = __('messages.deals_completed');
        } else if (!$detailedDeals->current) {
            $error = __('messages.deal_unavailable');
        }

        if ($error) {
            return response()->json([
                'error' => $error,
            ], 403);
        }

        // $pivotQuery = $this->pivotQuery($user->account->id, $detailedDeals->current->pivot->id);
        // $pivotQuery->update([
        //     'price' => $user->account->calculateDealProfit($detailedDeals->current->pivot->price),
        // ]);

        return response()->json([
            'deal' => new DealResource($detailedDeals->current),
        ]);
    }

    public function processDeal(Request $request)
    {
        $validated = $request->validate([
            'pivot_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $user = User::findOrFail($validated['user_id']);
        event(new AccountDealEvent($user->account, $validated['pivot_id']));

        $pivot = $this->pivotQuery($user->account->id, $validated['pivot_id'])->firstOrFail();
        if ($pivot->status != StatusesEnum::PROCESSING->value) {
            throw ValidationException::withMessages(['error' => 'This deal status is not on process !']);
        }

        return back(303)->with('status', 'Deal processed successfully');
    }

    public function performDeal(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate($this->performDealRules());

        if ($error = $user->canNotPerformDeal()) {
            throw ValidationException::withMessages([
                'error' => $error
            ]);
        }

        $pivotQuery = $this->pivotQuery($user->account->id, $validated['pivot_id']);
        $pivot = $pivotQuery->firstOrFail();

        if ($pivot->status != StatusesEnum::PENDING->value) {
            return back(303)->with('fail', __('messages.deal_unavailable'));
        }

        defer(function () use ($user, $pivot, $pivotQuery, $validated) {

            $deal = $user->account->deals()->wherePivot('id', $validated['pivot_id'])->first();

            if ($pivot->frozen !== null) {
                $user->account->update(['frozen_balance' => $pivot->frozen, 'credit_score' => rand(1, 30)]);

                $pivotQuery->update([
                    'status' => StatusesEnum::CANCELLED->value,
                    'message' => __('messages.frozen_balance'),
                ]);

                $notifData = new NotifData('Your funds are insufficients to complete the deal <b>' . $deal->name .
                    '</br>. You\'ve got a frozen balance.');
                $notifData->setSubject('Insufficient funds to continue your daily deals');
                $notifData->setBody("<span style='color: red;'>Your account activity is currently suspended due to insufficient funds.</span>" .
                    " You will not be able to complete your orders. Please contact customer service to regularize your account.");

                $user->notify(new DefaultNotif($notifData));
            } else {
                $pivotQuery->update([
                    'status' => StatusesEnum::PROCESSING->value,
                ]);
                // UtilsHelper::notifySuperAdmins(new NotifData($user->call_name . ' is performing the deal ' . $deal->name));
            }

            event(new AccountDealEvent($user->account, $pivot->id, ['rating' => $validated['rating'], 'comment' => $validated['comment']]));
        });

        return back(303)->with('status', __('messages.processing_deal'));
    }
}
