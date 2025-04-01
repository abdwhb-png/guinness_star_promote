<?php

namespace Database\Seeders;

use App\Enums\WalletsEnum;
use App\Models\SiteSetting;
use App\Models\PaymentMethod;
use App\Models\CustomerService;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create customer services
        $customerServices = [
            'Telegram Service 1',
            'Telegram Service 2',
            'Whatsapp Service 1',
            'Whatsapp Service 2',
        ];

        collect($customerServices)->each(function ($customerService) {
            CustomerService::create([
                'title' => $customerService,
                'url' => 'https://example.com/' . $customerService,
            ]);
        });

        // create system settings
        SiteSetting::create([
            'enable_welcome_bonus' => false,
            'enable_referral_bonus' => true,
            'announcement' => 'Dear users, please note that our workbench operates from 10:00 AM to 23:00 PM.',
            'tcs' => $this->faker->text(5000),
            'about_us' => $this->faker->text(1000),
            'faq' => $this->faker->text(1000),
            'status' => true,
        ]);

        // create payment methods
        collect(WalletsEnum::all())->each(function ($pMethod) {
            PaymentMethod::create([
                'label' => $pMethod['label'],
                'name' => $pMethod['name'],
                'symbol' => $pMethod['symbol'] ?? null,
                'address' => $pMethod['symbol'] ? '0x' . $this->faker->sha256() : null,
                'img' => $pMethod['img'],
                'type' => $pMethod['type'],
                'status' => $pMethod['symbol'] ? false : true,
            ]);
        });

        // create memberships
        $memberships = [
            [
                "levelName" => "VIP 1",
                "logo" => "bronze.png",
                "description" => "● Suitable for most data capture scenarios involving light to medium usage<br/> ● No access to other Premium features",
                "price" => 100.00,
                "profit_ratio" => 0.5,
                "profit_ratio_after_frozen" => 0.5,
                "max_tasks" => 45,
                "max_gain" => 15,
            ],
            [
                "levelName" => "VIP 2",
                "logo" => "silver.png",
                "description" => "● Suitable for most data capture scenarios involving medium usage<br/>● Better profits and benefits than bronze package.",
                "price" => 500.00,
                "profit_ratio" => 1,
                "profit_ratio_after_frozen" => 1,
                "max_tasks" => 150,
                "max_gain" => 40,
            ],
            [
                "levelName" => "VIP 3",
                "logo" => "gold.png",
                "description" => "● Suitable for most data capture scenarios involving high usage<br>● Optimize products per set<br/>● Better profits and benefits than silver and bronze packages.",
                "price" => 1500.00,
                "profit_ratio" => 1.5,
                "profit_ratio_after_frozen" => 1.5,
                "max_tasks" => 220,
                "max_gain" => 70,
            ],
            [
                "levelName" => "VIP 4",
                "logo" => "platinum.png",
                "description" => "● Suitable for most data capture scenarios involving super high usage<br/>● Optimize products per set<br/>● Better profits and benefits than bronze, silver and gold packages.",
                "price" => 5000.00,
                "profit_ratio" => 2,
                "profit_ratio_after_frozen" => 2,
                "max_tasks" => 300,
                "max_gain" => 110,
            ]
        ];

        collect($memberships)->each(function ($membership) {
            \App\Models\Membership::create($membership);
        });
    }
}
