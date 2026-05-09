import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            
            // ✅ Corrigé : access_token (pas token)
            if (response.data && response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                if (response.data.user?.name) {
                    localStorage.setItem('username', response.data.user.name);
                }
                navigate('/notes');
            }
        } catch (error) {
            console.error("Détails de l'erreur:", error.response);
            
            if (error.response && error.response.status === 500) {
                alert("Erreur Serveur (500) : Vérifie que le modèle User utilise HasApiTokens.");
            } else if (error.response && error.response.status === 401) {
                alert("Email ou mot de passe incorrect.");
            } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="input-field" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input 
                            type="password" 
                            className="input-field" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                    <p className="auth-note">
                        Pas encore de compte ? <Link to="/register" className="link-text">S'inscrire</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;