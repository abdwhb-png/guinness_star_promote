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
        Schema::create('user_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('membership_id')->nullable()->constrained()->nullOnDelete()->cascadeOnUpdate();
            $table->string('account_no');
            $table->decimal('deposit')->default(0);
            $table->decimal('profit')->default(0);
            $table->string('currency')->default(ConfigEnum::DEFAULT_CURRENCY);
            $table->integer('max_deals')->nullable();
            $table->integer('deal_reset_count')->default(-1);
            $table->decimal('profit_ratio')->default(ConfigEnum::DEFAULT_PROFIT_RATIO);
            $table->decimal('frozen_balance')->nullable();
            $table->string('withdrawal_password')->nullable();
            $table->boolean('can_work')->default(true);
            $table->boolean('can_withdraw')->default(true);
            $table->integer('credit_score')->default(100);
            $table->integer('profit_min')->nullable();
            $table->integer('profit_max')->nullable();
            $table->string('profit_type')->default('positive');
            $table->boolean('mail')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_accounts');
    }
};
