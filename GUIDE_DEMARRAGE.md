# 🚀 Guide de Démarrage Rapide

## Étapes pour lancer l'application complète

### 1️⃣ Démarrer le serveur MCP (Backend)

Ouvrez un terminal dans le dossier `agent2` :

```bash
cd C:\Users\JONATHAN\Documents\agent2
uvicorn mcp_server:app --reload --port 8000
```

Vous devriez voir :
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### 2️⃣ Démarrer l'interface Vue.js (Frontend)

Ouvrez un **nouveau terminal** dans le dossier `client_mcp1` :

```bash
cd C:\Users\JONATHAN\Documents\projetVueJS\clientMCP\client_mcp1
npm run dev
```

Vous devriez voir :
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 3️⃣ Ouvrir l'application

Ouvrez votre navigateur à l'adresse : **http://localhost:5173**

### 4️⃣ Tester la connexion

1. Vous devriez voir un indicateur vert "Connecté à l'API" en bas de l'interface
2. Tapez un message dans le champ de saisie
3. Cliquez sur "Envoyer" ou appuyez sur Entrée
4. L'agent devrait répondre !

## 🎯 Exemples de messages à tester

- "Quels sont les projets prévus pour 2024 ?"
- "Créez un document Word avec un rapport mensuel"
- "Générez un fichier Excel avec un budget"

## ⚠️ Problèmes courants

### Le serveur ne démarre pas

**Erreur : `ModuleNotFoundError`**
- Vérifiez que toutes les dépendances Python sont installées
- Activez votre environnement virtuel si vous en utilisez un

**Erreur : `Port already in use`**
- Un autre processus utilise le port 8000
- Changez le port : `uvicorn mcp_server:app --reload --port 8001`
- N'oubliez pas de mettre à jour `VITE_API_URL` dans le `.env` du frontend

### L'interface ne se connecte pas au serveur

**Indicateur rouge "Déconnecté de l'API"**
1. Vérifiez que le serveur MCP est bien démarré
2. Vérifiez l'URL dans `src/services/api.js` (par défaut : `http://localhost:8000`)
3. Ouvrez la console du navigateur (F12) pour voir les erreurs détaillées

**Erreur CORS dans la console**
- Vérifiez que CORS est bien configuré dans `mcp_server.py`
- Vérifiez que l'origine de votre frontend est dans la liste `allow_origins`

### Les messages ne s'affichent pas

1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs dans l'onglet "Console"
3. Vérifiez l'onglet "Network" pour voir les requêtes HTTP

## 📝 Notes importantes

- **Ne fermez pas** le terminal du serveur MCP pendant que vous utilisez l'application
- Les sessions sont sauvegardées dans le `localStorage` du navigateur
- Pour réinitialiser une session, cliquez sur "Effacer l'historique"

## 🔄 Arrêter l'application

- Dans les terminaux, appuyez sur `Ctrl + C` pour arrêter les serveurs

