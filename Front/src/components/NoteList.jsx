import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, filterPriority, onFilterChange, onDelete, onEdit }) => {
  return (
    <section className="panel notes-panel">
      <div className="panel-header">
        <h3>Liste des notes</h3>
        <div className="filter-row">
          <label>Filtrer :</label>
          <select
            className="select-field select-sm"
            value={filterPriority}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="Toutes">Toutes</option>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="alert-card">Aucune note trouvée pour ce filtre.</div>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </div>
      )}
    </section>
  );
};

export default NoteList;
