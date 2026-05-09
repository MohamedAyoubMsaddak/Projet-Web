import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotesPage from './pages/NotesPage';
import './App.css';

function App() {
  // Petite fonction pour vérifier si l'utilisateur est connecté (présence du token)
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <Router>
      <div className="app-shell">
        <div className="app-container">
          <Routes>
          {/* Routes Publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route Privée (Notes) : Redirige vers /login si pas de token */}
          <Route 
            path="/notes" 
            element={isAuthenticated() ? <NotesPage /> : <Navigate to="/login" />} 
          />

          {/* Redirection par défaut : si on arrive sur "/", on va vers les notes */}
          <Route path="/" element={<Navigate to="/notes" />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;