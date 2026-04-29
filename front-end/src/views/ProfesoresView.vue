<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Profesores</h1>
        <p class="page-sub">Gestión de profesores y asignación de cursos</p>
      </div>
      <button @click="openNew" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nuevo profesor
      </button>
    </div>

    <transition name="slide-down">
      <div v-if="showForm" class="form-card">
        <div class="form-card-header">
          <h2>{{ edit ? 'Editar profesor' : 'Nuevo profesor' }}</h2>
          <button @click="clear" class="btn-close" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form @submit.prevent="save" class="form-grid">
          <div class="field">
            <label>Nombre <span class="req">*</span></label>
            <input v-model="form.nombre" placeholder="Nombre del profesor" required>
          </div>
          <div class="field">
            <label>Apellido <span class="req">*</span></label>
            <input v-model="form.apellido" placeholder="Apellido del profesor" required>
          </div>
          <div class="field">
            <label>Email <span class="req">*</span></label>
            <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required>
          </div>
          <div class="field">
            <label>Teléfono</label>
            <input v-model="form.telefono" placeholder="Número de teléfono">
          </div>
          <div class="field">
            <label>Departamento</label>
            <input v-model="form.departamento" placeholder="Ej: Matemáticas, Ciencias, etc.">
          </div>
          <div class="field">
            <label>Asignar curso</label>
            <select v-model="form.curso_id" class="field-input">
              <option :value="null">-- Sin asignar --</option>
              <option v-for="curso in cursosDisponibles" :key="curso.id" :value="curso.id">
                {{ curso.codigo_curso }} - {{ curso.nombre }}
              </option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" @click="clear" class="btn btn-ghost">Cancelar</button>
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
          <input v-model="search" placeholder="Buscar por nombre, email, departamento…">
          <button v-if="search" @click="search = ''" class="clear-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <span class="count-badge">{{ filtered.length }} profesores</span>
      </div>

      <div v-if="loading" class="loading-rows">
        <div v-for="i in 4" :key="i" class="skeleton-row">
          <div class="sk sk-md"></div>
          <div class="sk sk-lg"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
        </div>
      </div>

      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">👨‍🏫</div>
        <p>{{ search ? 'Sin resultados para tu búsqueda' : 'No hay profesores registrados' }}</p>
        <button v-if="!search" @click="openNew" class="btn btn-primary btn-sm">Agregar primero</button>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Teléfono</th>
              <th>Curso Asignado</th>
              <th class="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td class="td-name">{{ item.nombre }} {{ item.apellido }}</td>
              <td class="td-muted">{{ item.email }}</td>
              <td class="td-muted">{{ item.departamento || '—' }}</td>
              <td class="td-muted">{{ item.telefono || '—' }}</td>
              <td>
                <span v-if="item.curso_id && item.curso_nombre" class="badge badge-purple">
                  {{ item.curso_codigo }} - {{ item.curso_nombre }}
                </span>
                <span v-else class="td-muted">Sin asignar</span>
              </td>
              <td class="td-actions">
                <button @click="editItem(item)" class="icon-btn" title="Editar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button @click="toggleStatus(item)" class="icon-btn" :title="item.esta_activo ? 'Desactivar' : 'Activar'">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ 'text-amber-600': !item.esta_activo, 'text-slate-400': item.esta_activo }">
                    <path v-if="item.esta_activo" d="M18 12H6" stroke-width="2.5"/>
                    <path v-else d="M13 2L5 18h14l-7-16z"/>
                  </svg>
                </button>
                <button @click="deleteItem(item.id)" class="icon-btn icon-btn-danger" title="Eliminar">
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
import { ref, computed, onMounted } from 'vue'
import { profesorService } from '../services/api'
import { alertError, confirmDelete, toastSuccess } from '../utils/alerts'

const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const edit = ref(false)
const editId = ref(null)
const list = ref([])
const cursosDisponibles = ref([])
const search = ref('')
const form = ref({ 
  nombre: '', 
  apellido: '', 
  email: '', 
  telefono: '', 
  departamento: '', 
  curso_id: null,
  esta_activo: true 
})

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return list.value
  return list.value.filter(p =>
    `${p.nombre} ${p.apellido} ${p.email} ${p.departamento || ''}`.toLowerCase().includes(q)
  )
})

const load = async () => {
  loading.value = true
  try { 
    list.value = await profesorService.getAll() 
  }
  catch (_) {}
  finally { loading.value = false }
}

const loadCursos = async () => {
  try {
    cursosDisponibles.value = await profesorService.getCursosDisponibles()
  } catch (_) {}
}

const openNew = () => { 
  clear()
  loadCursos()
  showForm.value = true 
}

const save = async () => {
  saving.value = true
  try {
    if (edit.value) {
      await profesorService.update(editId.value, { ...form.value, esta_activo: true })
    } else {
      await profesorService.create({ ...form.value, esta_activo: true })
    }
    clear()
    await load()
    toastSuccess(edit.value ? 'Profesor actualizado' : 'Profesor guardado')
  } catch (e) {
    alertError(e.message)
  } finally {
    saving.value = false
  }
}

const editItem = (item) => {
  edit.value = true
  editId.value = item.id
  form.value = { 
    nombre: item.nombre, 
    apellido: item.apellido, 
    email: item.email, 
    telefono: item.telefono || '', 
    departamento: item.departamento || '', 
    curso_id: item.curso_id,
    esta_activo: item.esta_activo 
  }
  loadCursos()
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteItem = async (id) => {
  const r = await confirmDelete('¿Eliminar profesor?')
  if (r.isConfirmed) {
    await profesorService.delete(id)
    await load()
    toastSuccess('Eliminado', 1200)
  }
}

const toggleStatus = async (profesor) => {
  try {
    await profesorService.update(profesor.id, { 
      ...profesor, 
      esta_activo: !profesor.esta_activo 
    })
    await load()
    toastSuccess(profesor.esta_activo ? 'Profesor desactivado' : 'Profesor activado')
  } catch (e) {
    alertError(e.message)
  }
}

const clear = () => {
  showForm.value = false
  edit.value = false
  editId.value = null
  form.value = { nombre: '', apellido: '', email: '', telefono: '', departamento: '', curso_id: null, esta_activo: true }
}

onMounted(load)
</script>

<style scoped>
</style>
