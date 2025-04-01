<?php

use App\Enums\ConfigEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('max_deals')->default(ConfigEnum::MAX_DEALS);
            $table->decimal('profit_ratio')->default(ConfigEnum::DEFAULT_PROFIT_RATIO);
            $table->string('base_currency')->default(ConfigEnum::DEFAULT_CURRENCY);
            $table->decimal('welcome_bonus')->nullable()->default(ConfigEnum::WELCOME_BONUS);
            $table->boolean('enable_welcome_bonus')->default(false);
            $table->decimal('referal_bonus')->nullable()->default(ConfigEnum::REFERRAL_BONUS);
            $table->boolean('enable_referal_bonus')->default(false);
            $table->integer('profit_max_on_first')->default(ConfigEnum::PROFIT_MAX_ON_FIRST);
            $table->string('availability_time')->default('10:00 to 23:00 (UTC-05:00)');
            $table->string('frozen_balance_indic')->default('Pinned balance where there is a pending combination product in process.');
            $table->string('balance_indic')->default('The total balance reflects both the deposited amount and commissions earned.');
            $table->string('announcement', 500)->nullable();
            $table->text('reg_agree')->nullable();
            $table->text('tcs')->nullable();
            $table->text('about_us')->nullable();
            $table->text('faq')->nullable();
            $table->boolean('telegram')->default(true);
            $table->boolean('status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
