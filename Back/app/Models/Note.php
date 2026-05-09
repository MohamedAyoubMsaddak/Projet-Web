<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés en masse.
     * Respecte les champs : title (max 100), content, priority, user_id.
     */
    protected $fillable = [
        'title', 
        'content', 
        'priority', 
        'user_id'
    ];

    /**
     * Relation : Une note appartient à un utilisateur.
     */
    public function user(): BelongsTo
    {
        // On s'assure d'utiliser le modèle User du même namespace
        return $this->belongsTo(User::class);
    }
}