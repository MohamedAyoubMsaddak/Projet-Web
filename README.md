# ProjetWeb

Ce dépôt contient un projet web complet en deux parties :

- `Back/` : API et serveur Laravel (PHP)
- `Front/` : application client React + Vite

## Vue d'ensemble

Le projet est structuré comme suit :

- `Back/` : backend Laravel 12, PHP 8.2, authentification API possible avec Sanctum, gestion des notes et des utilisateurs.
- `Front/` : interface utilisateur React 19, routage avec React Router, communication HTTP avec Axios et bundling géré par Vite.

## Prérequis

Assurez-vous d'avoir installé :

- PHP 8.2+
- Composer
- Node.js 18+ et npm
- Git (optionnel)

## Installation

### 1. Backend

```bash
cd Back
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

Si vous utilisez une base de données SQLite, vérifiez le fichier `config/database.php` et créez le fichier `database/database.sqlite` si nécessaire.

### 2. Frontend

```bash
cd ../Front
npm install
```

## Exécution

### Démarrer le backend

```bash
cd Back
php artisan serve
```

Par défaut, l'API sera accessible sur `http://127.0.0.1:8000`.

### Démarrer le frontend

```bash
cd Front
npm run dev
```

Le frontend se lancera avec Vite, généralement sur `http://127.0.0.1:5173`.

## Scripts utiles

### Backend (`Back/package.json` ou composer)

- `composer install` : installe les dépendances PHP
- `php artisan migrate` : exécute les migrations
- `php artisan serve` : lance le serveur de développement Laravel
- `php artisan test` : exécute les tests PHPUnit

### Frontend (`Front/package.json`)

- `npm run dev` : démarre le serveur de développement Vite
- `npm run build` : construit l'application pour la production
- `npm run preview` : prévisualise la version construite
- `npm run lint` : vérifie le code avec ESLint

## Architecture et emplacement des fichiers

- `Back/app/Http/Controllers/` : contrôleurs Laravel
- `Back/app/Models/` : modèles Eloquent PHP
- `Back/routes/web.php` : routes web Laravel
- `Back/routes/api.php` : routes API Laravel
- `Front/src/` : code source React
- `Front/src/components/` : composants React
- `Front/src/pages/` : pages de l'application

## Notes

- Le backend utilise Laravel Sanctum pour l'authentification et les tokens personnels.
- Le frontend utilise `axios` pour les appels API vers le backend.
- Les deux parties sont séparées afin de faciliter le développement et le déploiement.

## À propos

Ce README global est destiné à faciliter la mise en route et l'utilisation du projet depuis la racine `ProjetWeb`.
