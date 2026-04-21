<template>
  <div class="estudiantes">
    <h1>Gestión de Estudiantes</h1>
    
    <form @submit.prevent="guardarEstudiante" class="form">
      <h2>{{ editando ? 'Editar' : 'Nuevo' }} Estudiante</h2>
      <input v-model="estudiante.codigo_estudiante" placeholder="Código" required>
      <input v-model="estudiante.nombres" placeholder="Nombres" required>
      <input v-model="estudiante.apellidos" placeholder="Apellidos" required>
      <input v-model="estudiante.correo" type="email" placeholder="Correo" required>
      <input v-model="estudiante.telefono" placeholder="Teléfono">
      <input v-model="estudiante.programa" placeholder="Programa">
      <button type="submit">{{ editando ? 'Actualizar' : 'Crear' }}</button>
      <button v-if="editando" type="button" @click="cancelar">Cancelar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Programa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantes" :key="est.id">
          <td>{{ est.codigo_estudiante }}</td>
          <td>{{ est.nombres }}</td>
          <td>{{ est.apellidos }}</td>
          <td>{{ est.correo }}</td>
          <td>{{ est.telefono }}</td>
          <td>{{ est.programa }}</td>
          <td>
            <button @click="editar(est)">Editar</button>
            <button @click="eliminar(est.id)" class="delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { estudianteService } from '../services/api'

const estudiantes = ref([])
const estudiante = ref({
  codigo_estudiante: '',
  nombres: '',
  apellidos: '',
  correo: '',
  telefono: '',
  programa: ''
})
const editando = ref(false)
const editId = ref(null)

const cargar = async () => {
  estudiantes.value = await estudianteService.getAll()
}

const guardarEstudiante = async () => {
  if (editando.value) {
    await estudianteService.update(editId.value, estudiante.value)
  } else {
    await estudianteService.create(estudiante.value)
  }
  cancelar()
  cargar()
}

const editar = (est) => {
  editando.value = true
  editId.value = est.id
  estudiante.value = { ...est }
}

const eliminar = async (id) => {
  if (confirm('¿Eliminar estudiante?')) {
    await estudianteService.delete(id)
    cargar()
  }
}

const cancelar = () => {
  editando.value = false
  editId.value = null
  estudiante.value = {
    codigo_estudiante: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    programa: ''
  }
}

onMounted(cargar)
</script>

<style scoped>
.estudiantes { padding: 1rem; }
.form { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.form input { padding: 0.5rem; }
.form button { padding: 0.5rem 1rem; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
th { background: #f5f5f5; }
.delete { background: #ff4444; color: white; margin-left: 0.5rem; }
</style>