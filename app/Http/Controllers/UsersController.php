<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Enums\RolesEnum;
use App\Jobs\ResetDealJob;
use App\Enums\StatusesEnum;
use Illuminate\Http\Request;
use App\Trait\ValidationRules;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Request as FacadesRequest;

class UsersController extends BaseController
{
    use ValidationRules;

    protected function parseUser(User $user): array
    {
        $detailedDeals = $user->detailedDeals();
        $results = [
            ...$user->withoutRelations()->toArray(),
            'details' => [
                'phone' => $user->phone,
                'email' => $user->email,
                'username' => $user->username,
                'invitation_code' => $user->account->account_no,
                'total_balance' => $user->account->balance ? number_format($user->account->balance, 2) : 'none',
                // 'frozen_balance' => $user->account->frozen_balance ? number_format($user->account->frozen_balance, 2) : 'none',
            ],
            'deals_details' => [
                'counts' => $detailedDeals->counts,
                'status' => $detailedDeals->status,
                'current_deal' => $detailedDeals->current ? $detailedDeals->current->name : 'none'
            ],
            'more_infos' => [
                'invited_by' => $user->isInvitedBy(true) ?? 'unknown',
                ...$user->getInfos()->toArray()
            ],
            'isFrozed' => $user->isFrozed(),
            'isSuperAdmin' => $user->isSuperAdmin(),
            'isAdmin' => $user->isAdmin(),
        ];
        return $results;
    }

    protected function getAdmins()
    {
        if (!auth()->user()->isSuperAdmin()) {
            return [];
        }

        $query = User::where('id', '!=', auth()->id())->withoutRole(RolesEnum::USER->value);

        if (!auth()->user()->hasRole(RolesEnum::ROOT->value)) {
            $query->withoutRole(RolesEnum::ROOT->value);
        }

        // Use lazy collection to improve memory efficiency for large datasets
        return $query->with('roles')->get();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::where('id', '!=', Auth::id())->role(RolesEnum::USER->value);

        return Inertia::render(page_dir() . 'Users', [
            'filters' => FacadesRequest::all('search', 'sort'),
            'dealHasNegative' => false,
            'can' => [
                'edit_user' => auth()->user()->isSuperAdmin(),
                'delete_user' => auth()->user()->isSuperAdmin(),
                'manage_admins' => auth()->user()->isSuperAdmin(),
            ],
            'users' => $query->latest()
                ->filter(FacadesRequest::only('search', 'sort'))
                ->paginate($this->perPage())
                ->withQueryString()
                ->through(fn($item) => $this->parseUser($item)),
            'admins' => Inertia::defer(fn() => $this->getAdmins()),
        ]);
    }

    public function resetDeals(User $user, Request $request)
    {
        if ($user->account->isFrozed()) {
            throw ValidationException::withMessages(['error' => 'Please defroze this user before resetting his deals']);
        }

        ResetDealJob::dispatchSync($user->account);

        $pending = $user->account->fresh()->detailedDeals()->counts['pending'];

        return back(303)->with('status', $user->username . ' has been granted ' . $pending . '/' . $user->account->max_deals . ' new deals');
    }


    public function defroze(User $user, Request $request)
    {
        $account = $user->account;

        $currentDeal = $account->detailedDeals()->current;

        if ($currentDeal) {
            $account->deals()->updateExistingPivot($currentDeal->id, [
                'frozen' => null,
                'status' => StatusesEnum::PENDING->value,
            ]);
        }

        $account->updateQuietly([
            'frozen_balance' => null,
            'credit_score' => 100,
        ]);

        return back(303)->with('status', $user->username . ' has been defrozed successfully');
    }


    public function setNegative(Request $request, int $id)
    {
        $validated = $request->validate($this->negativeRules());

        $query = DB::table('deal_user_account')->where('id', $id)->where('status', 'pending');
        $find = $query->first();

        if (!$find) {
            throw ValidationException::withMessages(['error' => 'This deal is not available right now. Refresh the page and try again!']);
        }

        $query->update([
            'frozen' => $validated['amount'] ? -1 * $validated['amount'] : null,
            'updated_at' => now(),
        ]);

        return back(303)->with('status', 'Negative balance updated successfully');
    }
}
