<template>
  <div class="asistencias">
    <h1>Registro de Asistencias</h1>
    
    <form @submit.prevent="registrarAsistencia" class="form">
      <h2>Nuevo Registro</h2>
      <select v-model="asistencia.estudiante_id" required>
        <option value="">Seleccionar estudiante</option>
        <option v-for="est in estudiantes" :key="est.id" :value="est.id">
          {{ est.nombres }} {{ est.apellidos }}
        </option>
      </select>
      <input v-model="asistencia.fecha_asistencia" type="date" required>
      <select v-model="asistencia.estado" required>
        <option value="presente">Presente</option>
        <option value="ausente">Ausente</option>
        <option value="tarde">Tarde</option>
        <option value="eximido">Eximido</option>
      </select>
      <input v-model="asistencia.observacion" placeholder="Observación">
      <button type="submit">Registrar</button>
    </form>

    <h2>Historial de Asistencias</h2>
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
        <tr v-for="asis in filteredAsistencias" :key="asis.id">
          <td>{{ getNombreEstudiante(asis.estudiante_id) }}</td>
          <td>{{ asis.fecha_asistencia }}</td>
          <td>
            <span :class="['estado', asis.estado]">{{ asis.estado }}</span>
          </td>
          <td>{{ asis.observacion || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { asistenciaService, estudianteService } from '../services/api'

const estudiantes = ref([])
const asistencias = ref([])
const asistencia = ref({
  estudiante_id: '',
  fecha_asistencia: new Date().toISOString().split('T')[0],
  estado: 'presente',
  observacion: ''
})

const filteredAsistencias = computed(() => 
  [...asistencias.value].sort((a, b) => new Date(b.fecha_asistencia) - new Date(a.fecha_asistencia))
)

const cargar = async () => {
  estudiantes.value = await estudianteService.getAll()
  asistencias.value = await asistenciaService.getAll()
}

const getNombreEstudiante = (id) => {
  const est = estudiantes.value.find(e => e.id === id)
  return est ? `${est.nombres} ${est.apellidos}` : 'Desconocido'
}

const registrarAsistencia = async () => {
  await asistenciaService.create(asistencia.value)
  cargar()
  asistencia.value = {
    estudiante_id: '',
    fecha_asistencia: new Date().toISOString().split('T')[0],
    estado: 'presente',
    observacion: ''
  }
}

onMounted(cargar)
</script>

<style scoped>
.asistencias { padding: 1rem; }
.form { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.form input, .form select { padding: 0.5rem; }
.form button { padding: 0.5rem 1rem; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
th { background: #f5f5f5; }
.estado { padding: 0.25rem 0.5rem; border-radius: 3px; text-transform: capitalize; }
.presente { background: #4caf50; color: white; }
.ausente { background: #f44336; color: white; }
.tarde { background: #ff9800; color: white; }
.eximido { background: #9c27b0; color: white; }
</style>