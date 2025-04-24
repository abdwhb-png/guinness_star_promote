<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Enums\RolesEnum;
use App\Jobs\ResetDealJob;
use App\Enums\StatusesEnum;
use Illuminate\Support\Arr;
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
                'username' => $user->username,
                'email' => $user->email,
                'total_balance' => number_format(($user->account->balance ?? 0), 2),
                'invited_by' => $user->isInvitedBy(true),
                'account_currency' => $user->account->currency,
            ],
            'deals_details' => [
                'counts' => $detailedDeals->counts,
                'status' => $detailedDeals->status,
                'current_deal' => $detailedDeals->current?->name ?? null
            ],
            'more_infos' => [
                'deposit' => $user->account->deposit,
                'profit' => $user->account->profit,
                'profit_ratio' => $user->account->profit_ratio . '%',
                'invit_code' => $user->account->account_no,
                // ...$user->getInfos()->toArray()
                // 'frozen_balance' => $user->account->frozen_balance ? number_format($user->account->frozen_balance, 2) : 'none',
            ],
            'isFrozed' => $user->isFrozed(),
            'isSuperAdmin' => $user->isSuperAdmin(),
            'isAdmin' => $user->isAdmin(),
        ];
        return $results;
    }

    protected function getAdmins()
    {
        if (!Auth::user()->isSuperAdmin()) {
            return [];
        }

        $query = User::where('id', '!=', Auth::id())->withoutRole(RolesEnum::USER->value);

        if (!Auth::user()->hasRole(RolesEnum::ROOT->value)) {
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
        $user = Auth::user();

        return Inertia::render(page_dir() . 'Users', [
            'filters' => FacadesRequest::all('search', 'sort'),
            'dealHasNegative' => false,
            'can' => [
                'create_user' => $user->isSuperAdmin(),
                'edit_user' => $user->isSuperAdmin(),
                'delete_user' => $user->isSuperAdmin(),
                'manage_admins' => $user->isSuperAdmin(),
            ],
            'users' => $query->latest()
                ->filter(FacadesRequest::only('search', 'sort'))
                ->paginate($this->perPage())
                ->withQueryString()
                ->through(fn($item) => $this->parseUser($item)),
            'roles' => collect(RolesEnum::cases())
                ->filter(fn($role) => $role->value !== RolesEnum::ROOT->value)
                ->all(),
            'admins' => fn() => $this->getAdmins(),
        ]);
    }

    public function revokeDeals(User $user)
    {
        $user->account->deals()->detach();
        return back(303)->with('status', $user->username . ' has been revoked of his deals');
    }

    public function resetDeals(User $user, Request $request)
    {
        if ($user->isFrozed()) {
            throw ValidationException::withMessages(['error' => 'Please defroze this user before resetting his deals']);
        }

        ResetDealJob::dispatchSync($user->account);
        $pending = $user->fresh()->detailedDeals()->counts['pending'];

        return back(303)->with('status', $user->username . ' has been granted ' . $pending . '/' . $user->account->max_deals . ' new deals');
    }


    public function defroze(User $user, Request $request)
    {
        $account = $user->account;
        $currentDeal = $user->detailedDeals()->current;

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
