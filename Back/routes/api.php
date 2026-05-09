<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\AuthController; // Nous allons créer ce contrôleur juste après
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- ROUTES PUBLIQUES ---
// Accessibles sans token [cite: 49, 53, 54]
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// --- ROUTES PROTÉGÉES ---
// Accessibles uniquement avec un token Sanctum valide [cite: 22, 49]
Route::middleware('auth:sanctum')->group(function () {
    
    // Informations sur l'utilisateur connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Gestion des Notes (CRUD) [cite: 28, 49]
    Route::get('/notes', [NoteController::class, 'index']);      // Lister [cite: 29]
    Route::post('/notes', [NoteController::class, 'store']);     // Ajouter [cite: 29]
    Route::put('/notes/{id}', [NoteController::class, 'update']); // Modifier [cite: 29]
    Route::delete('/notes/{id}', [NoteController::class, 'destroy']); // Supprimer [cite: 29]
    
    // Déconnexion [cite: 23, 49]
    Route::post('/logout', [AuthController::class, 'logout']);
});