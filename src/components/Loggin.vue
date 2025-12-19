<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-header">
        <h1>Bienvenue</h1>
        <p>Connectez-vous à votre compte</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <!-- Mot de passe -->
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
              <path d="M7 13a3 3 0 00-3 3v3a3 3 0 003 3h10a3 3 0 003-3v-3a3 3 0 00-3-3"/>
            </svg>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17.94 17.94A10.07 10.07 0 003.12 3.12a10.07 10.07 0 14.84 14.84M9.9 4.24A9.72 9.72 0 0112 4c7 0 11 8 11 8a18.45 18.45 0 01-5.06 5.94M9.9 4.24A9.72 9.72 0 0012 4"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Lien Mot de passe oublié -->
        <div class="forgot-password">
          <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
        </div>

        <!-- Bouton Connexion -->
        <button type="submit" class="btn-login">Se connecter</button>
      </form>

      <!-- Divider -->
      <div class="divider">
        <span>ou</span>
      </div>

      <!-- Google Login -->
      <button @click="loginWithGoogle" class="btn-google">
        <svg viewBox="0 0 24 24" class="google-icon">
          <path fill="#EA4335" d="M5.26620228 12.745432c0-1.188081.959066-2.147144 2.147144-2.147144h5.4104329c1.188081 0 2.147144.959066 2.147144 2.147144v5.4104329c0 1.188081-.959066 2.147144-2.147144 2.147144H7.41337519c-1.188081 0-2.147144-.959066-2.147144-2.147144z"/>
          <path fill="#34A853" d="M16.9822622 6.04649101c.0503193-.9765625.8058394-1.74703957 1.7823819-1.74703957.9765425 0 1.7320626.77046307 1.7823819 1.74703957H23V4.13436267C23 2.95328135 22.0467899 2 20.8657086 2H4.13429138C2.95320995 2 2 2.95328135 2 4.13436267v15.7313547C2 20.0467899 2.95320995 21 4.13429138 21h16.7313972C20.0467899 21 21 20.0467899 21 18.8657086v-12.8193175h-4.01737377z"/>
          <path fill="#4285F4" d="M7.26620228 12.745432h5.4104329v5.4104329H7.26620228z"/>
          <path fill="#FBBC05" d="M2 8.04649101C2.0503193 7.07010742 2.8058394 6.29962158 3.7823819 6.29962158c.9765425 0 1.7320626.77046307 1.7823819 1.74703957H7v-1.9118814C7 4.13436267 6.04669005 3.18108132 4.86560862 3.18108132H4.13429138C2.95320995 3.18108132 2 4.13436267 2 5.31544409z"/>
        </svg>
        Connexion avec Google
      </button>

      <!-- Inscription -->
      <div class="signup-link">
        Pas encore inscrit ? <router-link to="/register">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  console.log('Login attempt:', { email: email.value, password: password.value })
  // Ajouter la logique de connexion ici
}

const loginWithGoogle = () => {
  console.log('Login with Google')
  // Ajouter la logique Google login ici
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-wrapper {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.login-header p {
  color: #999;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.input-wrapper:focus-within {
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-icon {
  width: 20px;
  height: 20px;
  margin-left: 14px;
  color: #999;
  flex-shrink: 0;
  stroke-width: 2;
}

.input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 14px;
  font-size: 14px;
  color: #333;
  outline: none;
}

.input-wrapper input::placeholder {
  color: #bbb;
}

.toggle-password {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #667eea;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.forgot-password {
  text-align: right;
  margin-top: -12px;
}

.forgot-password a {
  color: #667eea;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-password a:hover {
  color: #764ba2;
}

.btn-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-login:active {
  transform: translateY(0);
}

.divider {
  position: relative;
  text-align: center;
  margin: 20px 0;
  color: #ccc;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 20px);
  height: 1px;
  background: #e0e0e0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-google:hover {
  border-color: #667eea;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.google-icon {
  width: 20px;
  height: 20px;
}

.signup-link {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 20px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.signup-link a:hover {
  color: #764ba2;
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 30px 20px;
  }

  .login-header h1 {
    font-size: 24px;
  }

  .btn-login,
  .btn-google {
    padding: 14px 16px;
    font-size: 15px;
  }
}
</style>
