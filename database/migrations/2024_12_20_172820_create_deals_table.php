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
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->string('unique_id')->nullable();
            $table->string('category')->nullable();
            $table->string('name');
            $table->string('display_price')->nullable();
            $table->text('description')->nullable();
            $table->integer('popularity')->nullable();
            $table->text('tags')->nullable();
            $table->text('img_path')->nullable();
            $table->text('img_url')->nullable();
            $table->json('images')->nullable();
            $table->text('spotify_url')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deals');
    }
};
