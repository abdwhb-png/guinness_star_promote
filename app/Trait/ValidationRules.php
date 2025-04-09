<?php

namespace App\Trait;

use App\Enums\ConfigEnum;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use App\Helpers\ConfigHelper;
use Illuminate\Support\Facades\DB;

trait ValidationRules
{
    protected function existsInColumns(string $table, array $columns, string|null $value)
    {
        foreach ($columns as $column) {
            if (DB::table($table)->where($column, $value)->exists()) {
                return true;
            }
        }

        return false;
    }

    public function checkPasswordRules(): array
    {
        return [
            'password' => 'required',
            'type' => 'required|in:' . implode(',', ConfigHelper::getPasswordTypes()),
        ];
    }

    public function updatePasswordRules(): array
    {
        return [
            'current_password' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'type' => 'required|in:' . implode(',', ConfigHelper::getPasswordTypes()),
        ];
    }

    public function userRules($user, $action = 'store'): array
    {
        $rules = [
            'name' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:255|' . Rule::unique('users', 'username')->ignore($user->id),
            'email' => 'nullable|email|max:255|' . Rule::unique('users', 'email')->ignore($user->id),
            'phone' => 'sometimes|numeric|' . Rule::unique('users', 'phone')->ignore($user->id),
            'password' => ['sometimes', 'confirmed', Rules\Password::defaults()],
            'invitation_code' => 'sometimes|string|exists:user_accounts,account_no|max:255',

            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'gender' => 'nullable|in:male,female,other',
            'phone_number' => ['nullable', 'string', Rule::unique('user_infos', 'phone_number')->ignore($user->info->id)],
        ];

        if ($action == 'update') {
            return array_merge($rules, [
                'membership_id' => 'nullable|integer|exists:memberships,id',
                'deposit' => 'nullable|numeric|min:0',
                'profit' => 'nullable|numeric|min:0',
                'profit_ratio' => 'nullable|numeric|min:0',
                'min_balance' => 'nullable|numeric|min:0',
                'frozen_balance' => 'nullable|numeric',
                'can_work' => 'sometimes|integer|in:0,1',
                'credit_score' => 'sometimes|integer|min:0|max:100',
                'max_deals' => [
                    'nullable',
                    'integer',
                    'min:1',
                ],
                'profit_min' => 'nullable|numeric|min:0',
                'profit_max' => 'nullable|numeric|gte:profit_min',
                'currency' => 'sometimes|string|max:255',
                'withdrawal_password' => ['sometimes', 'confirmed', 'min:6'],
            ]);
        }

        return array_merge($rules, [
            'withdrawal_password' => ['sometimes', 'string', 'min:6', 'max:255'],
        ]);
    }

    public function paymentMethodRules(): array
    {
        return [
            'id' => 'required|integer|exists:payment_method_user_account,id',
            'address' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'owner' => 'nullable|string',
        ];
    }

    public function transactionRules(?string $action = ''): array
    {
        if ($action == 'delete') {
            return [
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
            ];
        }

        return [
            'type' => 'sometimes|in:' . implode(',', ConfigHelper::getTransactionTypes()),
            'amount' => 'sometimes|numeric|min:5',
            'method' => [
                'sometimes',
                'string',
                function ($attribute, $value, $fail) {
                    if (!$this->existsInColumns('payment_methods', ['symbol', 'name'], $value)) {
                        $fail("The selected {$attribute} is invalid.");
                    }
                },
            ],
            'status' => 'sometimes|string|in:' . implode(',', ConfigHelper::getStatuses()),
        ];
    }

    public function dealRules(string $action = ''): array
    {
        if ($action == 'delete') {
            return [
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
            ];
        }

        return [
            'category' => 'sometimes|in:' . implode(',', ConfigHelper::getDealCategories()),
            'name' => 'sometimes|string',
            'display_price' => 'nullable|numeric',
            'popularity' => 'nullable|integer',
            'url' => 'nullable|url:http,https',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,heic|max:' . ConfigEnum::IMG_MAX_FILE_SIZE->value,
        ];
    }

    public function pMethodRules(?string $action = 'store', $id = null)
    {
        if ($action == 'update') {
            if (!$id) {
                throw new \Exception('pMethod rules requires id');
            }

            return [
                'label' => [
                    'nullable',
                    'string',
                    'max:255',
                    'in:' . implode(',', array_values(payment_methods('labels'))),
                    Rule::unique('payment_methods', 'label')->ignore($id),
                ],
                'name' => [
                    'nullable',
                    'string',
                    'max:255',
                    'in:' . implode(',', array_values(payment_methods('names'))),
                    Rule::unique('payment_methods', 'name')->ignore($id),
                ],
                'symbol' => [
                    'nullable',
                    'string',
                    'max:255',
                    'in:' . implode(',', array_values(payment_methods('symbols'))),
                    Rule::unique('payment_methods', 'symbol')->ignore($id),
                ],
                'owner' => 'nullable|string|max:255',
                'phone_number' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:255',
            ];
        }

        return [];
    }


    public function cServiceRules(?string $action = 'store', $id = null)
    {
        if ($action == 'update') {
            if (!$id) {
                throw new \Exception('cService rules requires id');
            }

            return [
                'title' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('customer_services', 'title')->ignore($id),
                ],
                'url' => 'nullable|url:http,https',
            ];
        }

        return [];
    }


    public function settingRules(?string $action = 'store', $item = null)
    {
        if ($action == 'update') {
            return [
                'base_currency' => 'required|string',
                'profit_ratio' => 'required|numeric',
                'max_deals' => 'required|integer',
                'welcome_bonus' => 'nullable|numeric',
                'enable_welcome_bonus' => 'required|boolean',
                'referal_bonus' => 'nullable|numeric',
                'enable_referal_bonus' => 'required|boolean',
                'min_balance' => 'required|numeric',
                'profit_ratio' => 'nullable|numeric',
                'telegram' => 'required|boolean',
                'announcement' => 'nullable|string',
                'tcs' => 'nullable|string',
                'about_us' => 'nullable|string',
                'faq' => 'nullable|string',
            ];
        }

        return [];
    }


    public function membershipRules(?string $action = 'store', int $id = 0)
    {
        if ($action == 'update') {
            return [
                'levelName' => 'required|string|' .
                    Rule::unique('customer_services', 'title')->ignore($id),
                'price' => 'required|numeric|min:0',
                'profit_ratio' => 'required|numeric',
                'max_tasks' => [
                    'sometimes',
                    'min:10',
                    'integer',
                    function ($attribute, $value, $fail) {
                        if ($value % 2 !== 0) {
                            $fail("The $attribute must be an even number.");
                        }
                    },
                ],
                'description' => 'nullable|string',
                'max_gain' => 'nullable|numeric',
            ];
        }

        return [];
    }


    public function rolesPermsRules(?string $action = 'store', ?string $section = ''): array
    {
        if ($action == 'update') {
            return [
                'section' => 'required|string|in:roles,permissions',
                'roles' => [Rule::requiredIf($section == 'roles'), 'array', 'min:1', 'max:1'],
                'roles.*' => ['string', 'exists:roles,name'],
                'permissions' => [Rule::requiredIf($section == 'permissions'), 'array', 'min:1'],
                'permissions.*' => ['string', 'exists:permissions,name'],
            ];
        }

        return [];
    }

    public function negativeRules(): array
    {
        return [
            'amount' => 'nullable|numeric|min:0',
        ];
    }

    public function performDealRules(): array
    {
        return [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
            'pivot_id' => 'required|integer|exists:deal_user_account,id',
        ];
    }
}
