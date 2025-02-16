# API Cyber Veille - Documentation

## Description
API de cyber veille permettant la gestion d'articles, d'utilisateurs, de souscriptions et le suivi des activités de scraping.

## Installation

```bash
$ npm install
```

## Configuration

Créez un fichier `.env` à la racine du projet :
```env
PORT=3000
DB_URI=mongodb://localhost:27017/cyber-veille
```

## Lancement

```bash
# Développement
$ npm run start

# Watch mode
$ npm run start:dev

# Production
$ npm run start:prod
```

## Endpoints API

### 👤 Users

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/users` | Créer un utilisateur |
| GET | `/users` | Liste des utilisateurs |
| GET | `/users/:id` | Détails d'un utilisateur |
| PATCH | `/users/:id` | Modifier un utilisateur |
| DELETE | `/users/:id` | Supprimer un utilisateur |

#### Exemple de création d'utilisateur
```json
POST /users
{
  "user_email": "user@example.com",
  "user_password": "password123",
  "user_role": "user",
  "user_preferences": {
    "notifications": {
      "email": true,
      "webhook": "https://webhook.site/xxx",
      "apiKey": "api-key-123"
    },
    "categories": ["security", "cloud"]
  }
}
```

### 📰 Articles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/articles` | Créer un article |
| GET | `/articles` | Liste des articles |
| GET | `/articles/:id` | Détails d'un article |
| PATCH | `/articles/:id` | Modifier un article |
| PATCH | `/articles/:id/moderate` | Modérer un article |
| DELETE | `/articles/:id` | Supprimer un article |

#### Exemple de création d'article
```json
POST /articles
{
  "title": "Nouvelle faille de sécurité",
  "source": "security-news.com",
  "content": "Description de la faille...",
  "category": ["security", "vulnerability"],
  "tags": ["CVE", "Windows"],
  "moderate": false
}
```

### 🔔 Subscriptions

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/subscriptions` | Créer un abonnement |
| GET | `/subscriptions` | Liste des abonnements |
| GET | `/subscriptions/:id` | Détails d'un abonnement |
| GET | `/subscriptions?userId=:id` | Abonnements d'un utilisateur |
| PATCH | `/subscriptions/:id` | Modifier un abonnement |
| DELETE | `/subscriptions/:id` | Supprimer un abonnement |

#### Exemple de création d'abonnement
```json
POST /subscriptions
{
  "userId": "user-id-123",
  "category": "security",
  "type": "email"
}
```

### 👍 Likes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/likes` | Créer un like |
| GET | `/likes` | Liste des likes |
| GET | `/likes/article/:articleId` | Likes d'un article |
| PUT | `/likes/article/:articleId/increment` | Incrémenter les likes |
| PUT | `/likes/article/:articleId/decrement` | Décrémenter les likes |
| DELETE | `/likes/:id` | Supprimer un like |

#### Exemple d'ajout de like
```json
POST /likes
{
  "articleId": "article-id-123",
  "likes": 1
}
```

### 🤖 Scraping Logs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/scraping-logs` | Créer un log |
| GET | `/scraping-logs` | Liste des logs |
| GET | `/scraping-logs/statistics` | Statistiques de scraping |
| GET | `/scraping-logs/source/:source` | Logs par source |
| GET | `/scraping-logs/source/:source/latest` | Dernier log d'une source |
| DELETE | `/scraping-logs/clear-old` | Nettoyer les anciens logs |
| DELETE | `/scraping-logs/:id` | Supprimer un log |

#### Exemple de création de log
```json
POST /scraping-logs
{
  "source": "security-news.com",
  "status": "success",
  "scrapedAt": "2024-03-14T12:00:00Z"
}
```

## Filtres disponibles

### Articles
- `GET /articles?category=security`
- `GET /articles?tags=CVE,Windows`
- `GET /articles?moderate=true`
- `GET /articles?source=security-news.com`

### Scraping Logs
- `GET /scraping-logs?source=security-news.com`
- `GET /scraping-logs?status=success`
- `GET /scraping-logs?startDate=2024-03-01&endDate=2024-03-14`

## Réponses d'erreur

```json
{
  "statusCode": 400|404|500,
  "message": "Description de l'erreur",
  "error": "Type d'erreur"
}
```

## Auteur
[Votre nom]

## License
MIT
