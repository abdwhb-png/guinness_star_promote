<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\RolesEnum;
use App\Helpers\ConfigHelper;
use App\Models\UserAccount;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $page = is_admin_domain() ? 'auth/admin' : 'auth';
        return Inertia::render($page . '/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $mergeRules = true ? [
            'withdrawal_password' => ['sometimes', 'string', 'min:6', 'max:255'],
            'terms' => 'required|accepted',
        ] : [];

        $validated = $request->validate(array_merge([
            'username' => 'sometimes|string|max:255',
            'phone' => ['sometimes', 'numeric', 'unique:users,phone'],
            'email' => 'sometimes|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'invitation_code' => 'required|string|exists:user_accounts,account_no|max:255',
        ], $mergeRules));

        $role = is_admin_domain() ? RolesEnum::ADMIN->value : RolesEnum::USER->value;
        $referrer = UserAccount::where('account_no', $validated['invitation_code'])->firstOrFail();

        $user = User::create([
            'invited_by' => $referrer->user_id,
            'phone' => $request->phone,
            'username' => $request->username,
            'email' => $request->email,
            'name' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($role);

        if (!empty($request->withdrawal_password) && $role == RolesEnum::USER->value) {
            UserAccount::updateOrCreate(
                [
                    'user_id' => $user->id,
                ],
                [
                    'withdrawal_password' => $validated['withdrawal_password'],
                    'currency' => ConfigHelper::getDefaultCurrency(),
                ]
            );
        }

        event(new Registered($user));

        Auth::login($user);

        return to_route(route_prefix() . 'dashboard');
    }
}
