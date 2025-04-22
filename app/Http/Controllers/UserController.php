<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Trait\GetTrait;
use App\Enums\RolesEnum;
use Illuminate\Http\Request;
use App\Trait\ValidationRules;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\ValidationException;
use Cjmellor\BrowserSessions\Facades\BrowserSessions;

class UserController extends BaseController
{
    use ValidationRules, GetTrait;

    public function index()
    {
        return User::role(RolesEnum::USER->value)->get()->mapInto(UserResource::class);
    }

    public function show(int $id = 0)
    {
        $user = $id == 0 ? request()->user() : User::findOrfail($id);
        return new UserResource($user);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->userRules());

        $user = User::create([
            'invited_by' => Auth::id() ?? null,
            'phone' => $validated['phone'],
            'username' => $validated['username'],
            'email' => $validated['email'] ?? null,
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role'] ?? RolesEnum::USER->value);
        event(new Registered($user));

        return back(303)->with('success', 'User created successfully');
    }

    public function update(Request $request, int $id = 0)
    {
        $user = $id ? User::findOrFail($id) : $request->user();

        $request->validate(['section' => 'required|in:password,account,withdrawal_password,info,payment_method']);
        $validated = $request->validate($this->userRules($user, 'update'));

        switch ($request->section) {
            case 'password':
                $user->update(['password' => Hash::make($validated['password'])]);
                break;

            case 'account':
                $user->account->update($validated);
                break;

            case 'withdrawal_password':
                $user->account->update(['withdrawal_password' => Hash::make($validated['withdrawal_password'])]);
                break;

            case 'info':
                return $this->updateInfo($request, $user);
                break;

            case 'payment_method':
                return $this->updatePaymentMethod($request, $user);
                break;

            default:
                throw new ValidationException(['error' => 'Invalid section for update.']);
        }

        return back(303)->with('status', 'The ' . $request->section . ' has been updated for ' . $user->call_name);
    }

    public function updateInfo(Request $request, int $id = 0)
    {
        $user = $id ? User::findOrFail($id) : $request->user();

        $validated = request()->validate($this->userRules($user));

        $user->update([
            'email' => $validated['email'],
            'username' => $validated['username'],
            'phone' => $validated['phone'],
            'name' => $validated['name'] ?? null,
        ]);

        $user->info->update([
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'gender' => $validated['gender'] ?? null,
        ]);

        return back(303)->with('status', 'Profile information updated successfully');
    }

    public function updatePassword(Request $request, int $id = 0)
    {
        $user = $id ? User::findOrFail($id) : $request->user();

        $validated = $request->validate($this->updatePasswordRules());

        if ($request->current_password && !$user->checkPassword($validated['type'], $validated['current_password'])) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.']
            ]);
        }

        if ($request->type == 'withdrawal') {
            $user->account->update(['withdrawal_password' => Hash::make($validated['password'])]);
        }
        if ($request->type == 'login') {
            $user->update(['password' => Hash::make($validated['password'])]);
        }

        return back(303)->with('status', 'Password updated successfully');
    }

    public function updatePaymentMethod(Request $request, $user = null)
    {
        $user = $user ?? $request->user();

        $validated = $request->validate($this->paymentMethodRules());

        DB::table('payment_method_user_account')->where('id', $validated['id'])->update([
            'address' => $validated['address'],
            'phone_number' => $validated['phone_number'],
            'owner' => $validated['owner'],
        ]);

        return back(303)->with('status', 'Payment method updated successfully');
    }

    public function transactions(int $id = 0)
    {
        $user = $id == 0 ? request()->user() : User::findOrfail($id);
        return $user->getTransactions();
    }

    public function deals(int $id = 0)
    {
        $user = $id == 0 ? request()->user() : User::findOrfail($id);
        return $user->getDeals();
    }

    public function destroy(int $id = 0)
    {
        $user = $id == 0 ? request()->user() : User::findOrfail($id);

        $user->deleteQuietly();

        return back(303)->with('status', 'User deleted successfully');
    }

    public function sessionsGet()
    {
        return BrowserSessions::sessions();
    }

    public function logoutOtherSessions(Request $request)
    {
        $request->validate(['password' => 'required']);

        BrowserSessions::logoutOtherBrowserSessions($request->password);

        return back(303)->with('status', 'Logged out from other sessions.');
    }
}
