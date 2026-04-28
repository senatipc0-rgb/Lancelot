<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Panel izquierdo decorativo -->
      <div class="decorative-panel">
        <div class="panel-content">
          <div class="logo-section">
            <div class="logo-icon">🎓</div>
            <h1>EduGest</h1>
            <p>Sistema de Gestión Académica</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">254</div>
              <div class="stat-label">Estudiantes</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">18</div>
              <div class="stat-label">Cursos</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">97%</div>
              <div class="stat-label">Asistencia</div>
            </div>
          </div>

          <blockquote class="quote">
            "La educación es el arma más poderosa para cambiar el mundo"
            <cite>- Nelson Mandela</cite>
          </blockquote>
        </div>
      </div>

      <!-- Panel derecho de login -->
      <div class="login-box">
        <div class="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group" :class="{ error: errors.username }">
            <label for="username">Usuario</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input 
                type="text" 
                id="username" 
                v-model="form.username"
                @input="clearError('username')"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>
          </div>

          <div class="input-group" :class="{ error: errors.password }">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input 
                :type="showPassword ? 'text' : 'password'"
                id="password" 
                v-model="form.password"
                @input="clearError('password')"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button 
                type="button" 
                class="toggle-btn" 
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.remember">
              <span class="checkmark"></span>
              Recordarme
            </label>
            <a href="#" class="forgot-link" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
          </div>

          <div v-if="loginError" class="alert-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {{ loginError }}
          </div>

          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="!isLoading">Iniciar Sesión</span>
            <span v-else class="spinner"></span>
          </button>
        </form>

        <div class="login-footer">
          <p>¿Necesitas ayuda? <a href="#" @click.prevent="contactSupport">Contáctanos</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const showPassword = ref(false)
    const isLoading = ref(false)
    const loginError = ref('')

    const form = reactive({
      username: '',
      password: '',
      remember: false
    })

    const errors = reactive({
      username: '',
      password: ''
    })

    const clearError = (field) => {
      errors[field] = ''
      loginError.value = ''
    }

    const validateForm = () => {
      let isValid = true

      if (!form.username.trim()) {
        errors.username = 'El usuario es requerido'
        isValid = false
      }

      if (!form.password) {
        errors.password = 'La contraseña es requerida'
        isValid = false
      } else if (form.password.length < 6) {
        errors.password = 'Mínimo 6 caracteres'
        isValid = false
      }

      return isValid
    }

    const handleLogin = async () => {
      if (!validateForm()) return

      isLoading.value = true
      loginError.value = ''

      try {
        // Simulación API
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (form.username === 'demo' && form.password === 'demo123') {
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('user', JSON.stringify({ username: form.username }))
          
          // SweetAlert de bienvenida
          await Swal.fire({
            title: '¡Bienvenido! 👋',
            html: `<p>Iniciando sesión como <strong>${form.username}</strong></p>`,
            icon: 'success',
            confirmButtonColor: '#2563eb',
            confirmButtonText: 'Entrar al panel',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
              setTimeout(() => {
                Swal.hideLoading()
              }, 800)
            }
          })
          
          router.push('/')
        } else if (form.username && form.password) {
          // Login exitoso demo para cualquier usuario
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('user', JSON.stringify({ username: form.username }))
          
          await Swal.fire({
            title: '¡Bienvenido! 👋',
            html: `<p>Iniciando sesión como <strong>${form.username}</strong></p>`,
            icon: 'success',
            confirmButtonColor: '#2563eb',
            confirmButtonText: 'Entrar al panel',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
              setTimeout(() => {
                Swal.hideLoading()
              }, 800)
            }
          })
          
          router.push('/')
        } else {
          // Error de login
          await Swal.fire({
            title: '❌ Error de acceso',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Intentar de nuevo'
          })
          loginError.value = 'Usuario o contraseña incorrectos'
        }
      } catch (err) {
        await Swal.fire({
          title: '⚠️ Error de conexión',
          text: 'No pudimos conectar con el servidor. Intenta más tarde.',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        })
        loginError.value = 'Error al conectar con el servidor'
      } finally {
        isLoading.value = false
      }
    }

    const forgotPassword = async () => {
      const { value: email } = await Swal.fire({
        title: '¿Olvidaste tu contraseña?',
        input: 'email',
        inputLabel: 'Ingresa tu email',
        inputPlaceholder: 'ejemplo@edugest.com',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar'
      })

      if (email) {
        await Swal.fire({
          title: '📧 Email enviado',
          text: `Se ha enviado un enlace de recuperación a ${email}`,
          icon: 'success',
          confirmButtonColor: '#2563eb'
        })
      }
    }

    const contactSupport = async () => {
      await Swal.fire({
        title: '💬 Contáctanos',
        html: `
          <p class="mb-4">Para obtener ayuda, contacta con nuestro equipo de soporte:</p>
          <div class="text-sm text-left">
            <p class="mb-2"><strong>Email:</strong> soporte@edugest.com</p>
            <p class="mb-2"><strong>Teléfono:</strong> +57 1 2345678</p>
            <p><strong>Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM</p>
          </div>
        `,
        icon: 'info',
        confirmButtonColor: '#2563eb'
      })
    }

    return {
      form,
      errors,
      showPassword,
      isLoading,
      loginError,
      handleLogin,
      forgotPassword,
      contactSupport,
      clearError
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%);
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
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

/* Panel decorativo */
.decorative-panel {
  flex: 1;
  background: linear-gradient(135deg, #1e40af 0%, #312e81 100%);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 500px;
}

.decorative-panel::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
}

.panel-content {
  position: relative;
  z-index: 2;
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.logo-section h1 {
  color: white;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.logo-section p {
  color: rgba(255,255,255,0.7);
  font-size: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quote {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  border-left: 3px solid rgba(255,255,255,0.3);
  font-style: italic;
  color: rgba(255,255,255,0.9);
  font-size: 0.95rem;
  line-height: 1.5;
}

.quote cite {
  display: block;
  margin-top: 0.5rem;
  color: rgba(255,255,255,0.6);
  font-style: normal;
  font-size: 0.85rem;
}

/* Login box */
.login-box {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #6b7280;
}

/* Form */
.login-form {
  width: 100%;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.input-wrapper input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.input-group.error input {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.toggle-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #9ca3af;
  transition: color 0.2s;
}

.toggle-btn:hover {
  color: #3b82f6;
}

.error-msg {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

/* Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #4b5563;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 12px;
}

.forgot-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* Alert */
.alert-error {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #991b1b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Button */
.btn-primary {
  width: 100%;
  padding: 1rem;
  font-size: 1.05rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Footer */
.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
}

.login-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.login-footer a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .decorative-panel {
    display: none;
  }
  
  .login-box {
    max-width: 100%;
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 0;
  }
  
  .login-box {
    padding: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
