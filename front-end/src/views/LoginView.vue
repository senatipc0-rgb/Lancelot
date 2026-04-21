<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <span class="login-icon">🎓</span>
        <h1>Iniciar Sesión</h1>
        <p>Sistema de Gestión de Asistencias</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input 
            id="username"
            v-model="credentials.username" 
            type="text" 
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            id="password"
            v-model="credentials.password" 
            type="password" 
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Iniciar Sesión' }}
        </button>
        
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const credentials = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas')

    localStorage.setItem('token', data.data.token)
    localStorage.setItem('user', JSON.stringify(data.data.user))

    Swal.fire({
      title: '¡Bienvenido!',
      text: `Hola, ${data.data.user.username}`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })

    router.push('/')
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%);
  position: fixed;
  inset: 0;
  z-index: 999;
}

.login-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.login-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #fff;
}

.login-header p {
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
  font-size: 0.9375rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  font-size: 0.875rem;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1.125rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
}

.form-group input:focus {
  border-color: rgba(167, 139, 250, 0.8);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.login-btn {
  width: 100%;
  padding: 0.9375rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.75rem;
  letter-spacing: 0.01em;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.error-message {
  color: #fca5a5;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 0.625rem;
}
</style>