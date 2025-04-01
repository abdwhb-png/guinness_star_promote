<?php

namespace Database\Factories;

use App\Models\User;
use App\Jobs\ResetDealJob;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->phoneNumber(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function role($role): Factory
    {
        return $this->state(function (array $attributes) {
            return [];
        })->afterMaking(function (User $user) {
            // ...
        })->afterCreating(function (User $user) use ($role) {
            $user->assignRole($role);
        });
    }

    public function withInfos(): Factory
    {
        return $this->state(function (array $attributes) {
            return [];
        })->afterMaking(function (User $user) {
            // ...
        })->afterCreating(
            function (User $user) {
                $user->account->updateOrCreate(
                    [
                        'user_id' => $user->id
                    ],
                    [
                        'withdrawal_password' => Hash::make('password')
                    ]
                );

                $user->info->updateOrCreate(
                    [
                        'user_id' => $user->id
                    ],
                    [
                        'phone_number' => $user->phone,
                        'first_name' => $this->faker->firstName(),
                        'last_name' => $this->faker->lastName(),
                        'birth_date' => $this->faker->date(),
                        'gender' => $this->faker->randomElement(['male', 'female', 'other']),
                        'address' => $this->faker->address(),
                        'city' => $this->faker->city(),
                        'state' => $this->faker->region(),
                        'country' => 'France', // $this->faker->country(),
                        'zip_code' => $this->faker->postcode(),
                    ]
                );
            }
        );
    }

    public function withDeals(): Factory
    {
        return $this->state(function (array $attributes) {
            return [];
        })->afterMaking(function (User $user) {
            // ...
        })->afterCreating(function (User $user) {
            if ($user->account) {
                ResetDealJob::dispatchSync($user->account, 30, false);
            }
        });
    }
}
