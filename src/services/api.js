// Service API pour communiquer avec le serveur MCP
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://agent3-s7b6.onrender.com').replace(/\/$/, '');

/**
 * Envoie un message à l'agent via le serveur MCP
 * @param {string} message - Le message de l'utilisateur
 * @param {string} sessionId - L'ID de session (optionnel, généré automatiquement si non fourni)
 * @returns {Promise<{answer: string}>} La réponse de l'agent
 */
export async function sendMessage(message, sessionId = null) {
  // Générer un session_id si non fourni
  const currentSessionId = sessionId || localStorage.getItem('session_id') || generateSessionId();
  
  // Sauvegarder le session_id dans le localStorage
  if (!sessionId) {
    localStorage.setItem('session_id', currentSessionId);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/mcp/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: currentSessionId,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    throw error;
  }
}

/**
 * Vérifie si le serveur MCP est accessible
 * @returns {Promise<boolean>} True si le serveur est accessible
 */
export async function checkConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.status === 'healthy' && data.agent_ready === true;
  } catch (error) {
    console.error('Erreur de connexion au serveur:', error);
    return false;
  }
}

/**
 * Génère un ID de session unique
 * @returns {string} Un ID de session unique
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Récupère le session_id actuel depuis le localStorage
 * @returns {string|null} Le session_id ou null
 */
export function getSessionId() {
  return localStorage.getItem('session_id');
}

/**
 * Réinitialise le session_id
 */
export function resetSession() {
  localStorage.removeItem('session_id');
}

