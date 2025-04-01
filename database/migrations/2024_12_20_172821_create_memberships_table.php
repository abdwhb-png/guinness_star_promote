<?php

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
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->string('levelName');
            $table->decimal('price');
            $table->decimal('profit_ratio');
            $table->decimal('profit_ratio_after_frozen');
            $table->integer('max_tasks');
            $table->decimal('max_gain')->default(15);
            $table->text('logo')->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(1);
            $table->integer('levelWeight')->default(1);
            $table->decimal('rebateRate')->nullable();
            $table->string('sourceHost')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};