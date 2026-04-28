<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Usuarios</h1>
        <p class="page-sub">Administración de cuentas y roles del sistema.</p>
      </div>
      <button class="btn btn-primary" @click="openNew">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nuevo usuario
      </button>
    </div>

    <transition name="slide-down">
      <div v-if="showForm" class="form-card">
        <div class="form-card-header">
          <h2>{{ edit ? 'Editar usuario' : 'Crear usuario' }}</h2>
          <button @click="clear" class="btn-close" aria-label="Cerrar">✕</button>
        </div>
        <form @submit.prevent="save" class="form-grid">
          <div class="field">
            <label>Usuario <span class="req">*</span></label>
            <input v-model="form.username" required />
          </div>
          <div class="field">
            <label>Email <span class="req">*</span></label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="field">
            <label>Rol <span class="req">*</span></label>
              <select v-model="form.rol" required class="field-input">
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="administrador">Administrador</option>
                <option value="docente">Docente</option>
                <option value="personal">Personal</option>
              </select>
          </div>
          <div class="field">
            <label>{{ edit ? 'Nueva contraseña (opcional)' : 'Contraseña *' }}</label>
            <input v-model="form.password" type="password" :required="!edit" minlength="6" />
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-ghost" @click="clear">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="saving" class="spinner"></span>
              {{ edit ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </transition>

    <div class="table-card">
      <div class="table-toolbar">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="search" placeholder="Buscar usuario o email..." />
        </div>
        <span class="count-badge">{{ filtered.length }} usuarios</span>
      </div>

      <div v-if="loading" class="loading-rows">
        <div v-for="i in 4" :key="i" class="skeleton-row">
          <div class="sk sk-md"></div><div class="sk sk-lg"></div><div class="sk sk-sm"></div>
        </div>
      </div>

      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">👤</div>
        <p>No hay usuarios para mostrar.</p>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th class="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filtered" :key="u.id">
              <td class="td-name">{{ u.username }}</td>
              <td class="td-muted">{{ u.email }}</td>
              <td><span class="badge badge-purple">{{ u.rol }}</span></td>
              <td>
                <span :class="['badge', u.esta_activo ? 'badge-green' : 'badge-red']">
                  {{ u.esta_activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
  <td class="td-actions">
            <button class="icon-btn" title="Editar" @click="editItem(u)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="icon-btn" :title="u.esta_activo ? 'Desactivar' : 'Activar'" @click="toggleStatus(u)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ 'text-amber-600': !u.esta_activo, 'text-slate-400': u.esta_activo }">
                <path v-if="u.esta_activo" d="M18 12H6" stroke-width="2.5"/>
                <path v-else d="M13 2L5 18h14l-7-16z"/>
              </svg>
            </button>
            <button class="icon-btn icon-btn-danger" title="Eliminar" @click="deleteItem(u.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usuarioService } from '../services/api'
import { alertError, confirmDelete, toastSuccess } from '../utils/alerts'

const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const edit = ref(false)
const editId = ref(null)
const users = ref([])
const search = ref('')
const form = ref({ username: '', email: '', rol: 'admin', password: '' })

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return users.value
  return users.value.filter((u) => `${u.username} ${u.email}`.toLowerCase().includes(q))
})

const load = async () => {
  loading.value = true
  try {
    const response = await usuarioService.getAll()
    users.value = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.users)
          ? response.users
          : []
  } catch (e) {
    alertError(e.message, 'No se pudo cargar usuarios')
  } finally {
    loading.value = false
  }
}

const openNew = () => { clear(); showForm.value = true }

const save = async () => {
  saving.value = true
  try {
    if (edit.value) {
      const payload = {
        username: form.value.username,
        email: form.value.email,
        rol: form.value.rol
      }
      if (form.value.password) payload.password = form.value.password
      await usuarioService.update(editId.value, payload)
    } else {
      await usuarioService.create(form.value)
    }
    await load()
    clear()
    toastSuccess(edit.value ? 'Usuario actualizado' : 'Usuario creado')
  } catch (e) {
    alertError(e.message)
  } finally {
    saving.value = false
  }
}

const editItem = (u) => {
  edit.value = true
  editId.value = u.id
  form.value = { username: u.username, email: u.email, rol: u.rol, password: '' }
  showForm.value = true
}

const toggleStatus = async (u) => {
  try {
    await usuarioService.toggleStatus(u.id, !u.esta_activo)
    await load()
    toastSuccess(u.esta_activo ? 'Usuario desactivado' : 'Usuario activado')
  } catch (e) {
    alertError(e.message)
  }
}

const deleteItem = async (id) => {
  const r = await confirmDelete('¿Eliminar usuario?')
  if (!r.isConfirmed) return
  try {
    await usuarioService.delete(id)
    await load()
    toastSuccess('Usuario eliminado')
  } catch (e) {
    alertError(e.message)
  }
}

const clear = () => {
  showForm.value = false
  edit.value = false
  editId.value = null
  form.value = { username: '', email: '', rol: 'admin', password: '' }
}

onMounted(load)
</script>
