<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    // Lister les notes (Read) - Triées par date décroissante [cite: 29]
    public function index()
    {
        return Auth::user()->notes()->orderBy('created_at', 'desc')->get();
    }

    // Ajouter une note (Create) [cite: 29]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:100', // Titre requis, max 100 [cite: 9, 29]
            'content' => 'nullable',       // Contenu optionnel [cite: 10, 29]
            'priority' => 'required|in:Basse,Moyenne,Haute', // [cite: 12]
        ]);

        $note = Auth::user()->notes()->create($validated);
        return response()->json($note, 201);
    }

    // Modifier une note (Update) [cite: 29]
    public function update(Request $request, $id)
    {
        $note = Auth::user()->notes()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|max:100',
            'content' => 'nullable',
            'priority' => 'required|in:Basse,Moyenne,Haute',
        ]);

        $note->update($validated);
        return response()->json($note);
    }

    // Supprimer une note (Delete) [cite: 29]
    public function destroy($id)
    {
        $note = Auth::user()->notes()->findOrFail($id);
        $note->delete();
        return response()->json(['message' => 'Note supprimée avec succès']);
    }
}