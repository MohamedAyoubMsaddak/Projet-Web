import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'Haute': return 'badge-danger';
            case 'Moyenne': return 'badge-warning';
            case 'Basse': return 'badge-success';
            default: return 'badge-secondary';
        }
    };

    return (
        <article className="note-card">
            <div className="note-card-header">
                <h5 className="note-card-title">{note.title}</h5>
                <span className={`priority-badge ${getPriorityClass(note.priority)}`}>
                    {note.priority}
                </span>
            </div>
            <p className="note-meta">Créée le : {new Date(note.created_at).toLocaleDateString('fr-FR')}</p>
            <p className="note-card-text">{note.content}</p>
            <div className="note-actions">
                <button className="btn btn-sm btn-secondary" onClick={() => onEdit(note)}>Modifier</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => {
                    if (window.confirm('Supprimer cette note ?')) onDelete(note.id);
                }}>Supprimer</button>
            </div>
        </article>
    );
};

export default NoteItem;