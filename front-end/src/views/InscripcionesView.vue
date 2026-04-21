<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Inscripciones</h1>
        <p class="page-sub">Inscripción de estudiantes a cursos</p>
      </div>
      <button @click="openNew" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nueva inscripción
      </button>
    </div>

    <transition name="slide-down">
      <div v-if="showForm" class="form-card">
        <div class="form-card-header">
          <h2>Nueva inscripción</h2>
          <button @click="clear" class="btn-close" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form @submit.prevent="save" class="form-grid cols-2">
          <div class="field">
            <label>Estudiante <span class="req">*</span></label>
            <select v-model="form.estudiante_id" required>
              <option value="">Seleccionar estudiante…</option>
              <option v-for="e in estudiantes" :key="e.id" :value="e.id">
                {{ e.codigo_estudiante }} — {{ e.nombres }} {{ e.apellidos }}
              </option>
            </select>
          </div>
          <div class="field">
            <label>Curso <span class="req">*</span></label>
            <select v-model="form.curso_id" required>
              <option value="">Seleccionar curso…</option>
              <option v-for="c in cursos" :key="c.id" :value="c.id">
                {{ c.codigo_curso }} — {{ c.nombre }}
              </option>
            </select>
          </div>
          <div class="field">
            <label>Estado</label>
            <select v-model="form.estado">
              <option value="inscrito">Inscrito</option>
              <option value="retirado">Retirado</option>
              <option value="completado">Completado</option>
              <option value="reprobado">Reprobado</option>
            </select>
          </div>
          <div class="field">
            <label>Nota final</label>
            <input v-model.number="form.nota_final" type="number" step="0.01" min="0" max="100" placeholder="0.00">
          </div>
          <div class="form-actions">
            <button type="button" @click="clear" class="btn btn-ghost">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="saving" class="spinner"></span>
              Inscribir
            </button>
          </div>
        </form>
      </div>
    </transition>

    <!-- Filters -->
    <div class="table-card">
      <div class="table-toolbar">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="search" placeholder="Buscar por estudiante o curso…">
          <button v-if="search" @click="search = ''" class="clear-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <select v-model="filterEstado" class="filter-select">
          <option value="">Todos los estados</option>
          <option value="inscrito">Inscrito</option>
          <option value="completado">Completado</option>
          <option value="retirado">Retirado</option>
          <option value="reprobado">Reprobado</option>
        </select>
        <span class="count-badge">{{ filtered.length }} inscripciones</span>
      </div>

      <div v-if="loading" class="loading-rows">
        <div v-for="i in 5" :key="i" class="skeleton-row">
          <div class="sk sk-lg"></div>
          <div class="sk sk-md"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
        </div>
      </div>

      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <p>{{ search || filterEstado ? 'Sin resultados para los filtros aplicados' : 'No hay inscripciones registradas' }}</p>
        <button v-if="!search && !filterEstado" @click="openNew" class="btn btn-primary btn-sm">Crear primera inscripción</button>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Nota</th>
              <th class="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td>
                <div class="cell-stack">
                  <span class="badge badge-blue">{{ item.codigo_estudiante }}</span>
                  <span class="td-name">{{ item.nombres }} {{ item.apellidos }}</span>
                </div>
              </td>
              <td>
                <div class="cell-stack">
                  <span class="badge badge-purple">{{ item.codigo_curso }}</span>
                  <span class="td-muted">{{ item.curso_nombre }}</span>
                </div>
              </td>
              <td class="td-muted">{{ formatDate(item.fecha_inscripcion) }}</td>
              <td>
                <span :class="['badge', estadoBadge(item.estado)]">{{ item.estado }}</span>
              </td>
              <td>
                <span v-if="item.nota_final != null" class="nota" :class="notaClass(item.nota_final)">
                  {{ item.nota_final }}
                </span>
                <span v-else class="td-muted">—</span>
              </td>
              <td class="td-actions">
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
import { inscripcionService, estudianteService, cursoService } from '../services/api'
import Swal from 'sweetalert2'

const list = ref([])
const estudiantes = ref([])
const cursos = ref([])
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const search = ref('')
const filterEstado = ref('')
const form = ref({ estudiante_id: '', curso_id: '', estado: 'inscrito', nota_final: null })

const filtered = computed(() => {
  let data = list.value
  const q = search.value.toLowerCase().trim()
  if (q) data = data.filter(i =>
    `${i.nombres} ${i.apellidos} ${i.codigo_estudiante} ${i.curso_nombre} ${i.codigo_curso}`.toLowerCase().includes(q)
  )
  if (filterEstado.value) data = data.filter(i => i.estado === filterEstado.value)
  return data
})

const estadoBadge = (e) => ({
  inscrito: 'badge-blue',
  completado: 'badge-green',
  retirado: 'badge-red',
  reprobado: 'badge-yellow'
}[e] || 'badge-gray')

const notaClass = (n) => n >= 60 ? 'nota-pass' : 'nota-fail'

const formatDate = (d) => d ? new Date(d).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const load = async () => {
  loading.value = true
  try {
    const [ins, est, cur] = await Promise.all([
      inscripcionService.getAll(),
      estudianteService.getAll(),
      cursoService.getAll()
    ])
    list.value = ins
    estudiantes.value = est
    cursos.value = cur
  } catch (_) {}
  finally { loading.value = false }
}

const openNew = () => { clear(); showForm.value = true }

const save = async () => {
  saving.value = true
  try {
    await inscripcionService.create(form.value)
    clear()
    await load()
    Swal.fire({ icon: 'success', title: 'Inscripción creada', timer: 1400, showConfirmButton: false, toast: true, position: 'top-end' })
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Error', text: e.message })
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  const r = await Swal.fire({
    title: '¿Eliminar inscripción?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280'
  })
  if (r.isConfirmed) {
    await inscripcionService.delete(id)
    await load()
    Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false, toast: true, position: 'top-end' })
  }
}

const clear = () => {
  showForm.value = false
  form.value = { estudiante_id: '', curso_id: '', estado: 'inscrito', nota_final: null }
}

onMounted(load)
</script>

<style scoped>
.cols-2 { grid-template-columns: repeat(2, 1fr); }

.filter-select {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  background: var(--surface-2);
  color: var(--text);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition);
}

.filter-select:focus { border-color: var(--primary); }

.cell-stack {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nota {
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.nota-pass { color: var(--success); background: var(--success-light); }
.nota-fail { color: var(--danger); background: var(--danger-light); }

@media (max-width: 480px) {
  .cols-2 { grid-template-columns: 1fr; }
}
</style>
