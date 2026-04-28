<template>
  <div class="space-y-6">
    <div class="page-header">
      <div>
        <h1 class="page-title">Centro de Notificaciones</h1>
        <p class="page-sub">Alertas automáticas y eventos importantes del panel.</p>
      </div>
      <button class="btn btn-ghost" @click="load">Recalcular alertas</button>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="text-sm font-semibold text-slate-800">Alertas del sistema</h2>
      <div class="mt-4 space-y-3">
        <div v-for="item in notifications" :key="item.id" class="rounded-xl border px-4 py-3" :class="item.variant">
          <p class="text-sm font-semibold">{{ item.title }}</p>
          <p class="mt-1 text-xs opacity-80">{{ item.message }}</p>
        </div>
        <p v-if="notifications.length === 0" class="text-sm text-slate-500">Sin alertas por ahora.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { asistenciaService, cursoService, estudianteService, inscripcionService } from '../services/api'
import { alertError } from '../utils/alerts'

const notifications = ref([])

const load = async () => {
  try {
    const [est, cur, ins, asi] = await Promise.all([
      estudianteService.getAll(),
      cursoService.getAll(),
      inscripcionService.getAll(),
      asistenciaService.getAll()
    ])

    const withoutInscripcion = est.filter((e) => !ins.some((i) => i.estudiante_id === e.id))
    const absent = asi.filter((a) => a.estado === 'ausente')
    const late = asi.filter((a) => a.estado === 'tarde')

    const temp = []
    if (withoutInscripcion.length > 0) {
      temp.push({
        id: 'inscripciones',
        title: 'Estudiantes sin inscripción',
        message: `Hay ${withoutInscripcion.length} estudiantes sin inscripción activa.`,
        variant: 'border-amber-200 bg-amber-50 text-amber-700'
      })
    }
    if (absent.length > 0) {
      temp.push({
        id: 'ausencias',
        title: 'Ausencias registradas',
        message: `Se registraron ${absent.length} ausencias en el historial actual.`,
        variant: 'border-red-200 bg-red-50 text-red-700'
      })
    }
    if (late.length > 0) {
      temp.push({
        id: 'tardanzas',
        title: 'Tardanzas acumuladas',
        message: `Hay ${late.length} registros con estado tarde.`,
        variant: 'border-violet-200 bg-violet-50 text-violet-700'
      })
    }
    temp.push({
      id: 'resumen',
      title: 'Resumen académico',
      message: `Actualmente hay ${est.length} estudiantes y ${cur.length} cursos activos.`,
      variant: 'border-blue-200 bg-blue-50 text-blue-700'
    })

    notifications.value = temp
  } catch (e) {
    alertError(e.message, 'No se pudo cargar notificaciones')
  }
}

onMounted(load)
</script>
