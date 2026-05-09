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
    Schema::create('notes', function (Blueprint $table) {
        $table->id();
        $table->string('title', 100); // Titre obligatoire, max 100 [cite: 9]
        $table->text('content')->nullable(); // Optionnel [cite: 10]
        $table->enum('priority', ['Basse', 'Moyenne', 'Haute'])->default('Moyenne'); // [cite: 12]
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Lié à l'utilisateur [cite: 41]
        $table->timestamps(); // Gère created_at et updated_at [cite: 11, 41]
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
