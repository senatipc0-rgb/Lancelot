<template>
  <div class="space-y-6">
    <div class="page-header">
      <div>
        <h1 class="page-title">Configuración del Sistema</h1>
        <p class="page-sub">Administra todas las configuraciones y preferencias de EduGest.</p>
      </div>
      <div v-if="maintenanceMode" class="flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M12 6v6l4 2.5"/>
        </svg>
        Modo Mantenimiento ACTIVO
      </div>
    </div>

    <!-- Modo Mantenimiento -->
    <div class="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h2 class="text-lg font-bold text-amber-900">🔧 Modo Mantenimiento</h2>
          <p class="mt-1 text-sm text-amber-800">Desactiva el acceso de usuarios mientras realizas actualizaciones.</p>
        </div>
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="maintenanceMode" type="checkbox" class="h-5 w-5 cursor-pointer rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
          <span class="text-sm font-semibold" :class="maintenanceMode ? 'text-amber-700' : 'text-amber-600'">
            {{ maintenanceMode ? 'Activo' : 'Inactivo' }}
          </span>
        </label>
      </div>
      <div v-if="maintenanceMode" class="mt-4 space-y-3">
        <div class="field">
          <label class="text-xs font-medium text-amber-700">Mensaje a mostrar</label>
          <textarea v-model="settings.maintenanceMessage" class="rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900 placeholder:text-amber-500" rows="3" placeholder="Ej: Sistema en mantenimiento..."></textarea>
        </div>
        <div class="field">
          <label class="text-xs font-medium text-amber-700">Tiempo estimado (minutos)</label>
          <input v-model.number="settings.maintenanceTime" type="number" min="5" max="1440" class="rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900" />
        </div>
      </div>
    </div>

    <!-- Grid de configuraciones -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Preferencias de Interfaz -->
      <div class="form-card">
        <div class="form-card-header">
          <h2>🎨 Interfaz y Apariencia</h2>
        </div>
        <div class="space-y-4 p-5">
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Tema Oscuro</span>
            <input v-model="settings.darkMode" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Animaciones reducidas</span>
            <input v-model="settings.reduceMotion" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Modo compacto</span>
            <input v-model="settings.compactMode" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
        </div>
      </div>

      <!-- Notificaciones -->
      <div class="form-card">
        <div class="form-card-header">
          <h2>🔔 Notificaciones</h2>
        </div>
        <div class="space-y-4 p-5">
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Notificaciones de asistencia</span>
            <input v-model="settings.notificationsAttendance" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Alertas de inscripciones</span>
            <input v-model="settings.notificationsInscriptions" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Recordatorios de agenda</span>
            <input v-model="settings.agendaAlerts" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Notificaciones por email</span>
            <input v-model="settings.emailNotifications" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
        </div>
      </div>

      <!-- Seguridad -->
      <div class="form-card">
        <div class="form-card-header">
          <h2>🔐 Seguridad</h2>
        </div>
        <div class="space-y-4 p-5">
          <div class="field">
            <label class="text-xs font-medium text-slate-600">Sesión inactiva (minutos)</label>
            <input v-model.number="settings.sessionTimeout" type="number" min="5" max="120" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" />
          </div>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Autenticación de dos factores</span>
            <input v-model="settings.twoFactorAuth" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label class="flex items-center justify-between text-sm text-slate-700">
            <span>Historial de login</span>
            <input v-model="settings.loginHistory" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <button class="btn btn-ghost mt-2 w-full text-sm" @click="changePassword">
            Cambiar contraseña
          </button>
        </div>
      </div>

      <!-- Sistema -->
      <div class="form-card">
        <div class="form-card-header">
          <h2>⚙️ Sistema</h2>
        </div>
        <div class="space-y-4 p-5">
          <div class="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <div class="mb-2 flex justify-between">
              <span>Versión:</span>
              <span class="font-semibold text-slate-800">1.0.0</span>
            </div>
            <div class="flex justify-between">
              <span>Base de datos:</span>
              <span class="font-semibold text-slate-800">MySQL 8.0</span>
            </div>
            <div class="mt-2 flex justify-between">
              <span>Estado:</span>
              <span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <span class="font-semibold text-emerald-600">En línea</span>
            </div>
          </div>
          <button class="btn btn-primary w-full text-sm" @click="runBackup">
            💾 Realizar backup
          </button>
          <button class="btn btn-ghost w-full text-sm" @click="viewLogs">
            📋 Ver logs
          </button>
        </div>
      </div>

      <!-- Idioma y Región -->
      <div class="form-card">
        <div class="form-card-header">
          <h2>🌐 Idioma y Región</h2>
        </div>
        <div class="space-y-4 p-5">
          <div class="field">
            <label class="text-xs font-medium text-slate-600">Idioma</label>
            <select v-model="settings.language" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <div class="field">
            <label class="text-xs font-medium text-slate-600">Zona horaria</label>
            <select v-model="settings.timezone" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <option value="UTC-5">UTC-5 (Colombia)</option>
              <option value="UTC-3">UTC-3 (Brasil)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div class="field">
            <label class="text-xs font-medium text-slate-600">Formato de fecha</label>
            <select v-model="settings.dateFormat" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Perfil -->
      <div class="form-card">
        <div class="form-card-header">
          <h2>👤 Mi Perfil</h2>
        </div>
        <div class="space-y-4 p-5">
          <div class="rounded-lg bg-slate-50 p-3">
            <p class="text-xs font-medium text-slate-600">Usuario:</p>
            <p class="mt-1 font-semibold text-slate-800">{{ username }}</p>
          </div>
          <div class="rounded-lg bg-slate-50 p-3">
            <p class="text-xs font-medium text-slate-600">Email:</p>
            <p class="mt-1 font-semibold text-slate-800">{{ userEmail }}</p>
          </div>
          <div class="rounded-lg bg-slate-50 p-3">
            <p class="text-xs font-medium text-slate-600">Última sesión:</p>
            <p class="mt-1 font-semibold text-slate-800">{{ lastLogin }}</p>
          </div>
          <button class="btn btn-ghost w-full text-sm" @click="editProfile">
            ✏️ Editar perfil
          </button>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap gap-3">
        <button class="btn btn-primary" @click="saveSettings">
          💾 Guardar configuración
        </button>
        <button class="btn btn-ghost" @click="clearSettings">
          🔄 Restablecer valores
        </button>
        <button class="btn btn-ghost text-red-600 hover:bg-red-50" @click="deleteAccount">
          🗑️ Eliminar cuenta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import { alertSuccess, toastSuccess } from '../utils/alerts'

const STORAGE_KEY = 'edugest_settings'
const defaults = {
  // Interfaz
  darkMode: false,
  reduceMotion: false,
  compactMode: false,
  // Notificaciones
  notificationsAttendance: true,
  notificationsInscriptions: true,
  agendaAlerts: true,
  emailNotifications: false,
  // Seguridad
  sessionTimeout: 30,
  twoFactorAuth: false,
  loginHistory: true,
  // Sistema
  language: 'es',
  timezone: 'UTC-5',
  dateFormat: 'dd/mm/yyyy',
  // Mantenimiento
  maintenanceMode: false,
  maintenanceMessage: 'El sistema está en mantenimiento. Por favor intente más tarde.',
  maintenanceTime: 30
}

const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
const settings = reactive({ ...(persisted || defaults) })
const maintenanceMode = ref(settings.maintenanceMode)
const username = JSON.parse(localStorage.getItem('user') || '{}')?.username || 'Usuario'
const userEmail = 'usuario@edugest.com'
const lastLogin = new Date().toLocaleString('es-ES')

const saveSettings = async () => {
  settings.maintenanceMode = maintenanceMode.value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  
  const result = await Swal.fire({
    title: '✅ Guardado',
    text: 'Tus preferencias se guardaron correctamente.',
    icon: 'success',
    confirmButtonColor: '#2563eb',
    confirmButtonText: 'OK'
  })
  
  if (result.isConfirmed && maintenanceMode.value) {
    Swal.fire({
      title: '⚠️ Modo Mantenimiento',
      text: `El sistema estará en mantenimiento por ${settings.maintenanceTime} minutos.`,
      icon: 'warning',
      confirmButtonColor: '#2563eb'
    })
  }
}

const clearSettings = async () => {
  const result = await Swal.fire({
    title: '¿Restablecer valores?',
    text: 'Esta acción restaurará todas las configuraciones a sus valores por defecto.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, restablecer',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    Object.assign(settings, defaults)
    maintenanceMode.value = false
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
    toastSuccess('Preferencias restablecidas')
  }
}

const changePassword = async () => {
  const { value: newPassword } = await Swal.fire({
    title: 'Cambiar contraseña',
    input: 'password',
    inputLabel: 'Nueva contraseña',
    inputPlaceholder: 'Ingresa tu nueva contraseña',
    showCancelButton: true,
    confirmButtonColor: '#2563eb'
  })

  if (newPassword) {
    await alertSuccess('✅ Cambio exitoso', 'Tu contraseña ha sido actualizada.', 1200)
  }
}

const runBackup = async () => {
  await Swal.fire({
    title: '💾 Realizando backup...',
    html: '<div class="spinner"></div>',
    allowOutsideClick: false,
    didOpen: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      Swal.fire({
        title: '✅ Backup completado',
        text: 'El backup se realizó exitosamente.',
        icon: 'success',
        confirmButtonColor: '#2563eb'
      })
    }
  })
}

const viewLogs = () => {
  Swal.fire({
    title: '📋 Logs del sistema',
    html: '<div class="text-left text-sm">...logs...logs...logs...</div>',
    confirmButtonColor: '#2563eb'
  })
}

const editProfile = async () => {
  const { value: newUsername } = await Swal.fire({
    title: 'Editar perfil',
    input: 'text',
    inputValue: username,
    showCancelButton: true,
    confirmButtonColor: '#2563eb'
  })

  if (newUsername) {
    await alertSuccess('✅ Perfil actualizado', 'Tu perfil se guardó correctamente.', 1200)
  }
}

const deleteAccount = async () => {
  const result = await Swal.fire({
    title: '⚠️ Eliminar cuenta',
    text: 'Esta acción es irreversible. ¿Estás seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    await Swal.fire({
      title: '😢 Cuenta eliminada',
      text: 'Tu cuenta ha sido eliminada permanentemente.',
      icon: 'info',
      confirmButtonColor: '#2563eb'
    })
  }
}
</script>
