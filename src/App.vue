<template >
  <div class="container mx-auto px-4 py-8 max-w-4xl">
        <!-- En-tête -->
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-2">
                🤖 Agent IA Intelligent
            </h1>
            <p class="text-gray-600">
                Interagissez avec votre agent IA pour créer des documents, rechercher des informations et plus encore
            </p>
        </header>

        <!-- Zone de chat -->
        <div class="bg-white rounded-lg shadow-xl overflow-hidden">
            <!-- Messages -->
            <div 
                id="messages-container" 
                class="h-96 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gray-50"
            >
                <div 
                    v-for="(message, index) in messages" 
                    :key="index"
                    :class=" [
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    ] "
                >
                    <div 
                        :class=" [
                            'max-w-[80%] rounded-lg p-4 shadow-sm',
                            message.role === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-white text-gray-800 border border-gray-200'
                        ] "
                    >
                        <div class="flex items-start gap-2">
                            <span v-if="message.role === 'assistant'" class="text-2xl">🤖</span>
                            <span v-else class="text-2xl">👤</span>
                            <div class="flex-1">
                                <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>
                                <p class="text-xs mt-2 opacity-70">
                                    {{ formatTime(message.timestamp) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Indicateur de chargement -->
                <div v-if="loading" class="flex justify-start">
                    <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">🤖</span>
                            <div class="flex gap-1">
                                <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow"></span>
                                <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow" style="animation-delay: 0.2s"></span>
                                <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow" style="animation-delay: 0.4s"></span>
                            </div>
                            <span class="text-gray-600 ml-2">L'agent réfléchit...</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Zone de saisie -->
            <div class="border-t border-gray-200 p-4 bg-white">
                <form @submit.prevent="sendMessage" class="flex gap-2">
                    <input
                        v-model="inputMessage"
                        type="text"
                        placeholder="Tapez votre message ici..."
                        class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        :disabled="loading"
                    />
                    <button
                        type="submit"
                        :disabled="loading || !inputMessage.trim()"
                        class="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                    >
                        <span v-if="!loading">Envoyer</span>
                        <span v-else class="flex items-center gap-1">
                            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Envoi...
                        </span>
                    </button>
                </form>
                
                <!-- Suggestions rapides -->
                <div class="mt-3 flex flex-wrap gap-2">
                    <button
                        v-for="suggestion in quickSuggestions"
                        :key="suggestion"
                        @click="useSuggestion(suggestion)"
                        class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        :disabled="loading"
                    >
                        {{ suggestion }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Statut de connexion -->
        <div class="mt-4 flex items-center justify-center gap-2 text-sm">
            <div 
                :class=" [
                    'w-2 h-2 rounded-full',
                    apiConnected ? 'bg-green-500' : 'bg-red-500'
                ] "
            ></div>
            <span :class="apiConnected ? 'text-green-600' : 'text-red-600'">
                {{ apiConnected ? 'Connecté à l\'API' : 'Déconnecté de l\'API' }}
            </span>
        </div>

        <!-- Bouton pour effacer l'historique -->
        <div class="mt-4 text-center">
            <button
                @click="clearHistory"
                class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:underline"
                :disabled="loading || messages.length === 0"
            >
                Effacer l'historique
            </button>
        </div>

        <!-- Affiche réponse et bouton de téléchargement si file_url existe -->
        <div v-if="answer" class="mt-4">
          <p>{{ answer }}</p>
          <a
            v-if="fileUrl"
            :href="serverBase + fileUrl"
            target="_blank"
            rel="noreferrer noopener"
            :download="fileName || ''"
            class="mt-2 inline-block px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Télécharger {{ fileName || 'le fichier' }}
          </a>
        </div>
    </div>
</template>
<script>
import { sendMessage, checkConnection, getSessionId, resetSession } from './services/api.js';

export default {
  name: 'App',
  data() {
    return {
      messages: [],
      inputMessage: '',
      loading: false,
      apiConnected: false,
      sessionId: null,
      quickSuggestions: [
        'Quels sont les projets prévus pour 2024 ?',
        'Créez un document Word avec un rapport mensuel',
        'Générez un fichier Excel avec un budget',
        'Quelles sont les informations sur le budget municipal ?'
      ],
      answer: '',
      fileUrl: null,
      fileName: null,
      serverBase: 'http://127.0.0.1:8000'
    };
  },
  mounted() {
    // Récupérer le session_id existant ou en créer un nouveau
    this.sessionId = getSessionId();
    
    // Vérifier la connexion au serveur
    this.checkApiConnection();
    
    // Message de bienvenue
    this.addMessage('assistant', 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ?');
    
    // Faire défiler vers le bas automatiquement
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  methods: {
    async sendMessage() {
      if (!this.inputMessage.trim() || this.loading) {
        return;
      }

      const userMessage = this.inputMessage.trim();
      this.inputMessage = '';
      
      // Ajouter le message de l'utilisateur
      this.addMessage('user', userMessage);
      
      // Faire défiler vers le bas
      this.scrollToBottom();
      
      // Activer le chargement
      this.loading = true;

      try {
        // Envoyer le message au serveur MCP
        const response = await sendMessage(userMessage, this.sessionId);
        const respText = response.answer || response.message || 'Aucune réponse reçue';
        this.addMessage('assistant', respText);
        // Mettre à jour `answer` pour afficher le bloc de téléchargement
        this.answer = respText;

        if (response.file_url) {
          this.fileUrl = response.file_url;
          this.fileName = response.file_name || '';
        } else {
          this.fileUrl = null;
          this.fileName = null;
        }
        // Vérifier la connexion
        this.apiConnected = true;
      } catch (error) {
        console.error('Erreur:', error);
        this.addMessage('assistant', 'Désolé, une erreur s\'est produite lors de la communication avec le serveur. Veuillez vérifier que le serveur MCP est démarré et accessible.');
        this.apiConnected = false;
      } finally {
        this.loading = false;
        // Faire défiler vers le bas après la réponse
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    
    addMessage(role, content) {
      this.messages.push({
        role: role,
        content: content,
        timestamp: new Date()
      });
    },
    
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    
    useSuggestion(suggestion) {
      if (this.loading) return;
      this.inputMessage = suggestion;
      // Optionnel : envoyer automatiquement
      // this.sendMessage();
    },
    
    clearHistory() {
      if (this.loading || this.messages.length === 0) return;
      
      if (confirm('Êtes-vous sûr de vouloir effacer l\'historique de la conversation ?')) {
        this.messages = [];
        resetSession();
        this.sessionId = null;
        this.addMessage('assistant', 'Historique effacé. Comment puis-je vous aider ?');
      }
    },
    
    scrollToBottom() {
      const container = document.getElementById('messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    
    async checkApiConnection() {
      // Vérifier la connexion au serveur
      try {
        const connected = await checkConnection();
        this.apiConnected = connected;
        
        // Vérifier périodiquement (toutes les 10 secondes)
        if (!this.apiConnected) {
          setTimeout(() => this.checkApiConnection(), 10000);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de connexion:', error);
        this.apiConnected = false;
        // Réessayer après 10 secondes
        setTimeout(() => this.checkApiConnection(), 10000);
      }
    },
    
    async send(message) {
      const sessionId = this.$store?.state.sessionId || 'default'; // ou générer/obtenir session
      const res = await chat(sessionId, message);
      this.answer = res.answer;
      this.fileUrl = res.file_url || null;
      this.fileName = res.file_name || null;
    }
  },
  
  watch: {
    // Faire défiler automatiquement quand de nouveaux messages sont ajoutés
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true
    }
  }
};
</script>
<style>
        /* Animation pour le chargement */
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Scrollbar personnalisée */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    </style>