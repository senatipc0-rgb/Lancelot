<template>
  <div class="space-y-6">
    <div class="page-header">
      <div>
        <h1 class="page-title">Reportes Inteligentes</h1>
        <p class="page-sub">Indicadores clave del sistema académico en tiempo real.</p>
      </div>
      <button class="btn btn-primary" @click="load">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M21 3v9h-9"/></svg>
        Actualizar
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wider text-slate-500">Estudiantes</p>
        <p class="mt-2 text-3xl font-bold text-slate-800">{{ kpis.estudiantes }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wider text-slate-500">Cursos activos</p>
        <p class="mt-2 text-3xl font-bold text-slate-800">{{ kpis.cursos }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wider text-slate-500">Inscripciones</p>
        <p class="mt-2 text-3xl font-bold text-slate-800">{{ kpis.inscripciones }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wider text-slate-500">Asistencias</p>
        <p class="mt-2 text-3xl font-bold text-slate-800">{{ kpis.asistencias }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-sm font-semibold text-slate-800">Distribución de asistencia</h2>
        <div class="mt-4 space-y-3">
          <div v-for="item in attendanceBreakdown" :key="item.key">
            <div class="mb-1 flex items-center justify-between text-xs text-slate-600">
              <span>{{ item.label }}</span>
              <span class="font-semibold">{{ item.count }}</span>
            </div>
            <div class="h-2 w-full rounded bg-slate-100">
              <div class="h-2 rounded" :class="item.barColor" :style="{ width: `${item.percent}%` }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-sm font-semibold text-slate-800">Top estudiantes por presencia</h2>
        <div class="mt-4 space-y-2">
          <div v-for="(row, idx) in topStudents" :key="row.estudiante_id" class="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
            <div class="flex items-center gap-3">
              <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{{ idx + 1 }}</span>
              <div>
                <p class="text-sm font-medium text-slate-800">{{ row.nombre }}</p>
                <p class="text-xs text-slate-500">{{ row.codigo }}</p>
              </div>
            </div>
            <span class="text-sm font-semibold text-emerald-600">{{ row.presente }}</span>
          </div>
          <p v-if="topStudents.length === 0" class="text-sm text-slate-500">No hay datos para ranking todavía.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { asistenciaService, cursoService, estudianteService, inscripcionService } from '../services/api'
import { alertError } from '../utils/alerts'

const kpis = ref({ estudiantes: 0, cursos: 0, inscripciones: 0, asistencias: 0 })
const asistencias = ref([])
const estudiantes = ref([])

const attendanceBreakdown = computed(() => {
  const total = asistencias.value.length || 1
  const map = {
    presente: { label: 'Presentes', count: 0, barColor: 'bg-emerald-500' },
    tarde: { label: 'Tardanzas', count: 0, barColor: 'bg-amber-500' },
    ausente: { label: 'Ausentes', count: 0, barColor: 'bg-red-500' },
    eximido: { label: 'Eximidos', count: 0, barColor: 'bg-violet-500' }
  }

  asistencias.value.forEach((a) => {
    if (map[a.estado]) map[a.estado].count += 1
  })

  return Object.entries(map).map(([key, value]) => ({
    key,
    ...value,
    percent: Math.min(100, Math.round((value.count / total) * 100))
  }))
})

const topStudents = computed(() => {
  const score = {}
  asistencias.value.forEach((a) => {
    if (!score[a.estudiante_id]) {
      score[a.estudiante_id] = { estudiante_id: a.estudiante_id, presente: 0 }
    }
    if (a.estado === 'presente') score[a.estudiante_id].presente += 1
  })

  const byId = Object.fromEntries(estudiantes.value.map((e) => [e.id, e]))
  return Object.values(score)
    .map((s) => ({
      ...s,
      nombre: byId[s.estudiante_id] ? `${byId[s.estudiante_id].nombres} ${byId[s.estudiante_id].apellidos}` : 'Desconocido',
      codigo: byId[s.estudiante_id]?.codigo_estudiante || '---'
    }))
    .sort((a, b) => b.presente - a.presente)
    .slice(0, 5)
})

const load = async () => {
  try {
    const [est, cur, ins, asi] = await Promise.all([
      estudianteService.getAll(),
      cursoService.getAll(),
      inscripcionService.getAll(),
      asistenciaService.getAll()
    ])
    estudiantes.value = est
    asistencias.value = asi
    kpis.value = {
      estudiantes: est.length,
      cursos: cur.length,
      inscripciones: ins.length,
      asistencias: asi.length
    }
  } catch (e) {
    alertError(e.message, 'No se pudo cargar reportes')
  }
}

onMounted(load)
</script>
