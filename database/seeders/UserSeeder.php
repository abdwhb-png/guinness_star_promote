<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    // use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->role(RolesEnum::ROOT->value)->create([
            'email' => 'winnerk088@gmail.com',
        ]);
        User::factory()->role(RolesEnum::SUPERADMIN->value)->create([
            'email' => 'admin@' . config('app.site_domain'),
        ]);
        User::factory()->role(RolesEnum::USER->value)->create([
            'username' => 'test-user',
        ]);

        if (config('app.env' == 'local')) {
            User::factory()->role(RolesEnum::ADMIN->value)->create();
            User::factory()->count(10)->role(RolesEnum::USER->value)->withInfos()->withDeals()->create();
        }
    }
}
