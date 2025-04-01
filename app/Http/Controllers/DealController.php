<?php

namespace App\Http\Controllers;

use App\NotifData;
use App\Models\Deal;
use App\Models\User;
use App\Trait\GetTrait;

use App\Enums\StatusesEnum;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;

use App\Trait\ValidationRules;;

use App\Events\AccountDealEvent;
use App\Http\Helpers\UtilsHelper;
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

    public function deal(): JsonResponse
    {
        $detailledDeals = request()->user()->detailedDeals();
        $error = null;

        if (!request()->user()->account->deposit) {
            $error = 'Your account balance is not enough to start. Please recharge your account.';
        } else if (!$detailledDeals->counts['pending']) {
            $error = 'You have completed all the available deals ! <br> Come back tomorrow form more.';
        } else if (!$detailledDeals->current) {
            $error = 'No deal available right now. Try again later.';
        }

        if ($error) {
            return response()->json([
                'error' => $error,
            ], 403);
        }

        return response()->json([
            'deal' => new DealResource($detailledDeals->current),
        ]);
    }

    public function performDeal(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate($this->performDealRules());

        if ($error = $user->account->canNotPerformDeal()) {
            throw ValidationException::withMessages([
                'error' => $error
            ]);
        }

        $pivotQuery = DB::table('deal_user_account')->where('id', $validated['pivot_id'])
            ->where('user_account_id', $user->account->id);

        $pivot = $pivotQuery->firstOrFail();

        if ($pivot->status != StatusesEnum::PENDING->value) {
            $error = 'This deal is not available right now. Refresh the page and try again!';

            return back(303)->with('fail', $error);
        }

        defer(function () use ($user, $pivot, $pivotQuery, $validated) {

            $deal = $user->account->deals()->wherePivot('id', $validated['pivot_id'])->first();

            if ($pivot->frozen !== null) {
                $user->account->update(['frozen_balance' => $pivot->frozen, 'credit_score' => rand(1, 30)]);

                $pivotQuery->update([
                    'status' => StatusesEnum::CANCELLED->value,
                    'message' => 'Your funds are insufficients to complete the deal. You\'ve got a frozen balance.',
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
                UtilsHelper::notifySuperAdmins(new NotifData($user->call_name . ' is performing the deal ' . $deal->name));
            }

            event(new AccountDealEvent($user->account, $pivot->id, ['rating' => $validated['rating'], 'comment' => $validated['comment']]));
        });

        return back(303)->with('status', 'Processing... Your commission will be sent to your wallet once done.');
    }
}
