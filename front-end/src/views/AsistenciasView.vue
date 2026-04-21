<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Asistencias</h1>
        <p class="page-sub">Control de asistencia diaria</p>
      </div>
      <button @click="openNew" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Registrar asistencia
      </button>
    </div>

    <!-- Summary chips -->
    <div v-if="!loading && list.length > 0" class="summary-row">
      <div class="summary-chip green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        {{ countByEstado('presente') }} Presentes
      </div>
      <div class="summary-chip red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        {{ countByEstado('ausente') }} Ausentes
      </div>
      <div class="summary-chip yellow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {{ countByEstado('tarde') }} Tardanzas
      </div>
      <div class="summary-chip purple">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        {{ countByEstado('eximido') }} Eximidos
      </div>
    </div>

    <transition name="slide-down">
      <div v-if="showForm" class="form-card">
        <div class="form-card-header">
          <h2>Registrar asistencia</h2>
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
            <label>Fecha <span class="req">*</span></label>
            <input v-model="form.fecha_asistencia" type="date" required>
          </div>
          <div class="field">
            <label>Estado <span class="req">*</span></label>
            <select v-model="form.estado" required>
              <option value="presente">Presente</option>
              <option value="ausente">Ausente</option>
              <option value="tarde">Tarde</option>
              <option value="eximido">Eximido</option>
            </select>
          </div>
          <div class="field">
            <label>Observación</label>
            <input v-model="form.observacion" placeholder="Observación opcional">
          </div>
          <div class="form-actions">
            <button type="button" @click="clear" class="btn btn-ghost">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="saving" class="spinner"></span>
              Registrar
            </button>
          </div>
        </form>
      </div>
    </transition>

    <div class="table-card">
      <div class="table-toolbar">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="search" placeholder="Buscar por nombre o código…">
          <button v-if="search" @click="search = ''" class="clear-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <select v-model="filterEstado" class="filter-select">
          <option value="">Todos los estados</option>
          <option value="presente">Presente</option>
          <option value="ausente">Ausente</option>
          <option value="tarde">Tarde</option>
          <option value="eximido">Eximido</option>
        </select>
        <span class="count-badge">{{ filtered.length }} registros</span>
      </div>

      <div v-if="loading" class="loading-rows">
        <div v-for="i in 5" :key="i" class="skeleton-row">
          <div class="sk sk-lg"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-sm"></div>
          <div class="sk sk-md"></div>
        </div>
      </div>

      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">✅</div>
        <p>{{ search || filterEstado ? 'Sin resultados para los filtros aplicados' : 'No hay asistencias registradas' }}</p>
        <button v-if="!search && !filterEstado" @click="openNew" class="btn btn-primary btn-sm">Registrar primera asistencia</button>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td>
                <div class="student-cell">
                  <div class="student-avatar" :style="{ background: avatarColor(item.estudiante_id) }">
                    {{ initials(getNombre(item.estudiante_id)) }}
                  </div>
                  <div>
                    <div class="td-name">{{ getNombre(item.estudiante_id) }}</div>
                    <div class="td-code">{{ getCodigo(item.estudiante_id) }}</div>
                  </div>
                </div>
              </td>
              <td class="td-muted">{{ formatDate(item.fecha_asistencia) }}</td>
              <td>
                <span :class="['badge', estadoBadge(item.estado)]">
                  {{ item.estado }}
                </span>
              </td>
              <td class="td-muted">{{ item.observacion || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { asistenciaService, estudianteService } from '../services/api'
import Swal from 'sweetalert2'

const list = ref([])
const estudiantes = ref([])
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const search = ref('')
const filterEstado = ref('')
const form = ref({ estudiante_id: '', fecha_asistencia: new Date().toISOString().split('T')[0], estado: 'presente', observacion: '' })

const filtered = computed(() => {
  let data = list.value
  const q = search.value.toLowerCase().trim()
  if (q) data = data.filter(i => {
    const nombre = getNombre(i.estudiante_id).toLowerCase()
    const codigo = getCodigo(i.estudiante_id).toLowerCase()
    return nombre.includes(q) || codigo.includes(q)
  })
  if (filterEstado.value) data = data.filter(i => i.estado === filterEstado.value)
  return data
})

const estadoBadge = (e) => ({
  presente: 'badge-green',
  ausente: 'badge-red',
  tarde: 'badge-yellow',
  eximido: 'badge-purple'
}[e] || 'badge-gray')

const countByEstado = (e) => list.value.filter(i => i.estado === e).length

const getNombre = (id) => {
  const e = estudiantes.value.find(x => x.id === id)
  return e ? `${e.nombres} ${e.apellidos}` : 'Desconocido'
}

const getCodigo = (id) => {
  const e = estudiantes.value.find(x => x.id === id)
  return e ? e.codigo_estudiante : ''
}

const initials = (name) => name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

const avatarColors = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0891b2']
const avatarColor = (id) => avatarColors[id % avatarColors.length]

const formatDate = (d) => d ? new Date(d).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const load = async () => {
  loading.value = true
  try {
    const [asi, est] = await Promise.all([
      asistenciaService.getAll(),
      estudianteService.getAll()
    ])
    list.value = asi.sort((a, b) => new Date(b.fecha_asistencia) - new Date(a.fecha_asistencia))
    estudiantes.value = est
  } catch (_) {}
  finally { loading.value = false }
}

const openNew = () => { clear(); showForm.value = true }

const save = async () => {
  saving.value = true
  try {
    await asistenciaService.create(form.value)
    clear()
    await load()
    Swal.fire({ icon: 'success', title: 'Asistencia registrada', timer: 1400, showConfirmButton: false, toast: true, position: 'top-end' })
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Error', text: e.message })
  } finally {
    saving.value = false
  }
}

const clear = () => {
  showForm.value = false
  form.value = { estudiante_id: '', fecha_asistencia: new Date().toISOString().split('T')[0], estado: 'presente', observacion: '' }
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

/* Summary chips */
.summary-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.summary-chip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.875rem;
  border-radius: 99px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.summary-chip svg { width: 14px; height: 14px; }

.summary-chip.green { background: var(--success-light); color: var(--success); }
.summary-chip.red { background: var(--danger-light); color: var(--danger); }
.summary-chip.yellow { background: var(--warning-light); color: var(--warning); }
.summary-chip.purple { background: var(--purple-light); color: var(--purple); }

/* Student cell */
.student-cell {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.student-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.td-code {
  font-size: 0.75rem;
  color: var(--text-light);
  margin-top: 0.1rem;
}

@media (max-width: 480px) {
  .cols-2 { grid-template-columns: 1fr; }
  .summary-row { gap: 0.5rem; }
}
</style>
