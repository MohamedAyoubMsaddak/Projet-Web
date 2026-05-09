import React, { useEffect, useState, useCallback, useMemo } from 'react'; // Ajout de useMemo
import axios from '../api/axios';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { useNavigate } from 'react-router-dom';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Moyenne');
  const [editingId, setEditingId] = useState(null);
  
  // ÉTAT POUR LE BONUS : Filtre sélectionné
  const [filterPriority, setFilterPriority] = useState('Toutes');
  const [userName, setUserName] = useState(localStorage.getItem('username') || '');
  
  const navigate = useNavigate();

  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get('/notes');
      setNotes(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // LOGIQUE DU BONUS : Filtrage des notes en mémoire
  const filteredNotes = useMemo(() => {
    if (filterPriority === 'Toutes') return notes;
    return notes.filter(note => note.priority === filterPriority);
  }, [notes, filterPriority]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setPriority('Moyenne');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Le titre est obligatoire");
    const data = { title: title.trim(), content: content || '', priority };
    try {
      if (editingId) {
        await axios.put(`/notes/${editingId}`, data);
      } else {
        await axios.post('/notes', data);
      }
      resetForm();
      fetchNotes();
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer définitivement cette note ? [cite: 29]")) {
      try {
        await axios.delete(`/notes/${id}`);
        if (editingId === id) resetForm();
        fetchNotes();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id); 
    setTitle(note.title);
    setContent(note.content || '');
    setPriority(note.priority);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
        await axios.post('/logout'); 
        localStorage.removeItem('token');
        navigate('/login');
    } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
    }
  };

  return (
    <div className="page-panel">
      <div className="page-header">
        <div>
          <p className="welcome-text">Bonjour {userName || 'cher utilisateur'},</p>
          <h2 className="page-title">Mes Notes</h2>
          <p className="page-subtitle">Gérez vos notes rapidement et en toute simplicité.</p>
        </div>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
          Déconnexion
        </button>
      </div>

      <div className="columns-2">
        <NoteForm
          editingId={editingId}
          title={title}
          content={content}
          priority={priority}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onPriorityChange={setPriority}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <NoteList
          notes={filteredNotes}
          filterPriority={filterPriority}
          onFilterChange={setFilterPriority}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default NotesPage;