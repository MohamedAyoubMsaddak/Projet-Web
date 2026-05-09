import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', { name, email, password });
            alert("Inscription réussie ! Vous pouvez vous connecter.");
            navigate('/login');
        } catch (error) {
            alert("Erreur lors de l'inscription. Vérifiez vos données.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Inscription</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Nom d'utilisateur</label>
                        <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success btn-block">S'inscrire</button>
                    <p className="auth-note">Déjà un compte ? <Link to="/login" className="link-text">Se connecter</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;