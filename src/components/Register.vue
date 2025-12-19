<template>
  <div class="register-container">
    <div class="register-wrapper">
      <div class="register-header">
        <h1>Créer un compte</h1>
        <p>Rejoignez notre communauté</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <!-- Nom -->
        <div class="form-group">
          <label for="lastname">Nom</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              id="lastname"
              v-model="lastname"
              type="text"
              placeholder="Votre nom"
              required
            />
          </div>
        </div>

        <!-- Prénoms -->
        <div class="form-group">
          <label for="firstname">Prénoms</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              id="firstname"
              v-model="firstname"
              type="text"
              placeholder="Vos prénoms"
              required
            />
          </div>
        </div>

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
                <path d="M17.94 17.94A10.07 10.07 0 003.12 3.12a10.07 10.07 0 14.84 14.84M9.9 4.24A9.72 9.72 0 0112 4c7 0 11 8 11 8a18.45 18.45 0 01-5.06 5.94M9.9 4.24A9.72 9.72 0 0112 4"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
          <div class="password-strength">
            <div class="strength-bar">
              <div
                class="strength-fill"
                :class="getPasswordStrength().class"
                :style="{ width: getPasswordStrength().percent + '%' }"
              ></div>
            </div>
            <span class="strength-text">{{ getPasswordStrength().text }}</span>
          </div>
        </div>

        <!-- Conditions -->
        <div class="form-group checkbox">
          <input
            id="terms"
            v-model="acceptTerms"
            type="checkbox"
            required
          />
          <label for="terms">
            J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a>
          </label>
        </div>

        <!-- Bouton S'inscrire -->
        <button type="submit" class="btn-register">Créer mon compte</button>
      </form>

      <!-- Connexion -->
      <div class="login-link">
        Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const lastname = ref('')
const firstname = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const acceptTerms = ref(false)

const handleRegister = async () => {
  if (!acceptTerms.value) {
    alert('Veuillez accepter les conditions d\'utilisation')
    return
  }
  console.log('Register attempt:', {
    lastname: lastname.value,
    firstname: firstname.value,
    email: email.value,
    password: password.value
  })
  // Ajouter la logique d'inscription ici
}

const getPasswordStrength = () => {
  const pwd = password.value
  let strength = 0
  let text = 'Faible'
  let className = 'weak'

  if (!pwd) {
    return { percent: 0, text: '', class: '' }
  }

  // Longueur
  if (pwd.length >= 8) strength++
  if (pwd.length >= 12) strength++

  // Caractères minuscules
  if (/[a-z]/.test(pwd)) strength++

  // Caractères majuscules
  if (/[A-Z]/.test(pwd)) strength++

  // Chiffres
  if (/[0-9]/.test(pwd)) strength++

  // Caractères spéciaux
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++

  if (strength <= 2) {
    text = 'Faible'
    className = 'weak'
  } else if (strength <= 4) {
    text = 'Moyen'
    className = 'medium'
  } else {
    text = 'Fort'
    className = 'strong'
  }

  const percent = (strength / 6) * 100

  return { percent, text, class: className }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-wrapper {
  width: 100%;
  max-width: 480px;
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

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.register-header p {
  color: #999;
  font-size: 14px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
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

.input-wrapper input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
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

.password-strength {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: -6px;
}

.strength-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-fill.weak {
  background: #ef5350;
  width: 33%;
}

.strength-fill.medium {
  background: #ffa726;
  width: 66%;
}

.strength-fill.strong {
  background: #66bb6a;
  width: 100%;
}

.strength-text {
  font-size: 12px;
  color: #999;
}

.form-group.checkbox {
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.form-group.checkbox input {
  margin-top: 2px;
  cursor: pointer;
}

.form-group.checkbox label {
  margin: 0;
  font-weight: 400;
  font-size: 13px;
  color: #666;
}

.form-group.checkbox a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.form-group.checkbox a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.btn-register {
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

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-register:active {
  transform: translateY(0);
}

.login-link {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 20px;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #764ba2;
}

@media (max-width: 480px) {
  .register-wrapper {
    padding: 30px 20px;
  }

  .register-header h1 {
    font-size: 24px;
  }

  .btn-register {
    padding: 14px 16px;
    font-size: 15px;
  }

  .register-form {
    gap: 16px;
  }
}
</style>
