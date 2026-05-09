import React from 'react';

const NoteForm = ({
  editingId,
  title,
  content,
  priority,
  onTitleChange,
  onContentChange,
  onPriorityChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <section className="panel form-panel">
      <div className="form-title">{editingId ? '📝 Modifier une note' : '➕ Nouvelle note'}</div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Titre (requis)</label>
          <input
            type="text"
            className="input-field"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
            maxLength="100"
          />
        </div>
        <div className="form-group">
          <label>Contenu (optionnel)</label>
          <textarea
            className="textarea-field"
            rows="4"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Priorité</label>
          <select
            className="select-field"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
        <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-primary'} btn-block`}>
          {editingId ? 'Mettre à jour' : 'Enregistrer'}
        </button>
        {editingId && (
          <button type="button" className="btn btn-link" onClick={onCancel}>
            Annuler
          </button>
        )}
      </form>
    </section>
  );
};

export default NoteForm;
