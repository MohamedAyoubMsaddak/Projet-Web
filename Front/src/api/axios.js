import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: false, // ✅ Mets false si tu utilises token Bearer (pas cookie)
});

// Ajout automatique du token pour les routes protégées
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;