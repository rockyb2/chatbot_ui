# Client MCP - Interface Vue.js pour Agent IA

Interface web moderne développée avec Vue.js pour interagir avec votre agent IA via le serveur MCP (FastAPI).

## 🚀 Fonctionnalités

- 💬 Interface de chat intuitive et moderne
- 🔄 Gestion automatique des sessions
- 📱 Design responsive avec Tailwind CSS
- ⚡ Indicateur de connexion en temps réel
- 💡 Suggestions rapides pour démarrer la conversation
- 📜 Historique des conversations sauvegardé localement

## 📋 Prérequis

- Node.js 16+ et npm
- Le serveur MCP doit être démarré (voir le projet `agent2`)

## 🛠️ Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer l'URL de l'API (optionnel)**

Créez un fichier `.env` à la racine du projet :
```env
VITE_API_URL=http://localhost:8000
```

Par défaut, l'application utilise `http://localhost:8000` comme URL du serveur MCP.

## 🎯 Utilisation

1. **Démarrer le serveur MCP** (dans le projet `agent2`)
```bash
cd agent2
uvicorn mcp_server:app --reload --port 8000
```

2. **Démarrer l'application Vue.js**
```bash
npm run dev
```

3. **Ouvrir dans le navigateur**
L'application sera accessible à l'adresse : `http://localhost:5173`

## 📁 Structure du projet

```
client_mcp1/
├── src/
│   ├── App.vue              # Composant principal avec l'interface de chat
│   ├── services/
│   │   └── api.js           # Service API pour communiquer avec le serveur MCP
│   ├── main.js              # Point d'entrée de l'application
│   └── style.css            # Styles globaux
├── vite.config.js          # Configuration Vite
└── package.json            # Dépendances du projet
```

## 🔧 Configuration

### Changer l'URL du serveur MCP

Vous pouvez modifier l'URL du serveur MCP de deux façons :

1. **Via le fichier `.env`** (recommandé)
```env
VITE_API_URL=http://localhost:8000
```

2. **Directement dans le code** (`src/services/api.js`)
```javascript
const API_BASE_URL = 'http://votre-url:port';
```

## 🎨 Personnalisation

### Modifier les suggestions rapides

Éditez le tableau `quickSuggestions` dans `src/App.vue` :

```javascript
quickSuggestions: [
  'Votre suggestion 1',
  'Votre suggestion 2',
  // ...
]
```

### Modifier les styles

L'application utilise Tailwind CSS. Vous pouvez modifier les classes dans `src/App.vue` ou ajouter des styles personnalisés dans `src/style.css`.

## 🐛 Dépannage

### Erreur de connexion au serveur

1. Vérifiez que le serveur MCP est démarré sur le port 8000
2. Vérifiez que CORS est bien configuré dans `mcp_server.py`
3. Vérifiez l'URL dans la console du navigateur (F12)

### Les messages ne s'affichent pas

1. Ouvrez la console du navigateur (F12) pour voir les erreurs
2. Vérifiez que le format de la réponse du serveur correspond à `{answer: string}`

## 📝 Notes

- Les sessions sont sauvegardées dans le `localStorage` du navigateur
- L'historique des conversations est stocké localement dans le composant
- Pour réinitialiser une session, cliquez sur "Effacer l'historique"

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou créer une pull request.

## 📄 Licence

[Spécifiez votre licence ici]
