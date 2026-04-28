<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Cursos</h1>
        <p class="page-sub">Catálogo de cursos académicos</p>
      </div>
      <button @click="openNew" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nuevo curso
      </button>
    </div>

    <transition name="slide-down">
      <div v-if="showForm" class="form-card">
        <div class="form-card-header">
          <h2>{{ edit ? 'Editar curso' : 'Nuevo curso' }}</h2>
          <button @click="clear" class="btn-close" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form @submit.prevent="save" class="form-grid">
          <div class="field">
            <label>Código <span class="req">*</span></label>
            <input v-model="form.codigo_curso" placeholder="Ej: MAT-101" required>
          </div>
          <div class="field">
            <label>Nombre <span class="req">*</span></label>
            <input v-model="form.nombre" placeholder="Nombre del curso" required>
          </div>
          <div class="field">
            <label>Descripción</label>
            <input v-model="form.descripcion" placeholder="Descripción breve">
          </div>
          <div class="field">
            <label>Créditos</label>
            <input v-model.number="form.creditos" type="number" min="0" placeholder="0">
          </div>
          <div class="field">
            <label>Período</label>
            <input v-model="form.periodo" placeholder="Ej: I, II, Verano">
          </div>
          <div class="field">
            <label>Año</label>
            <input v-model.number="form.anno" type="number" placeholder="2026">
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
          <input v-model="search" placeholder="Buscar por nombre, código o período…">
          <button v-if="search" @click="search = ''" class="clear-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <span class="count-badge">{{ filtered.length }} cursos</span>
      </div>

      <div v-if="loading" class="loading-rows">
        <div v-for="i in 4" :key="i" class="skeleton-row">
          <div class="sk sk-sm"></div>
          <div class="sk sk-lg"></div>
          <div class="sk sk-md"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
        </div>
      </div>

      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">📚</div>
        <p>{{ search ? 'Sin resultados para tu búsqueda' : 'No hay cursos registrados' }}</p>
        <button v-if="!search" @click="openNew" class="btn btn-primary btn-sm">Agregar primero</button>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Créditos</th>
              <th>Período</th>
              <th>Año</th>
              <th class="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td><span class="badge badge-purple">{{ item.codigo_curso }}</span></td>
              <td class="td-name">{{ item.nombre }}</td>
              <td class="td-muted">{{ item.descripcion || '—' }}</td>
              <td>
                <span v-if="item.creditos" class="badge badge-blue">{{ item.creditos }} cr.</span>
                <span v-else class="td-muted">—</span>
              </td>
              <td class="td-muted">{{ item.periodo || '—' }}</td>
              <td class="td-muted">{{ item.anno }}</td>
              <td class="td-actions">
                <button @click="editItem(item)" class="icon-btn" title="Editar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
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
import { cursoService } from '../services/api'
import { alertError, confirmDelete, toastSuccess } from '../utils/alerts'

const list = ref([])
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const edit = ref(false)
const editId = ref(null)
const search = ref('')
const form = ref({ codigo_curso: '', nombre: '', descripcion: '', creditos: 0, periodo: '', anno: new Date().getFullYear() })

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return list.value
  return list.value.filter(c =>
    `${c.nombre} ${c.codigo_curso} ${c.periodo || ''} ${c.descripcion || ''}`.toLowerCase().includes(q)
  )
})

const load = async () => {
  loading.value = true
  try { list.value = await cursoService.getAll() }
  catch (_) {}
  finally { loading.value = false }
}

const openNew = () => { clear(); showForm.value = true }

const save = async () => {
  saving.value = true
  try {
    if (edit.value) await cursoService.update(editId.value, { ...form.value, esta_activo: true })
    else await cursoService.create(form.value)
    clear()
    await load()
    toastSuccess(edit.value ? 'Actualizado' : 'Guardado')
  } catch (e) {
    alertError(e.message)
  } finally {
    saving.value = false
  }
}

const editItem = (item) => {
  edit.value = true
  editId.value = item.id
  form.value = { ...item }
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteItem = async (id) => {
  const r = await confirmDelete('¿Eliminar curso?')
  if (r.isConfirmed) {
    await cursoService.delete(id)
    await load()
    toastSuccess('Eliminado', 1200)
  }
}

const clear = () => {
  showForm.value = false
  edit.value = false
  editId.value = null
  form.value = { codigo_curso: '', nombre: '', descripcion: '', creditos: 0, periodo: '', anno: new Date().getFullYear() }
}

onMounted(load)
</script>

<style scoped>
</style>
