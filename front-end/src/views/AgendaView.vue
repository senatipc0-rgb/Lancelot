<template>
  <div class="space-y-6">
    <div class="page-header">
      <div>
        <h1 class="page-title">Agenda Académica</h1>
        <p class="page-sub">Planea actividades y recordatorios internos del equipo.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div class="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-sm font-semibold text-slate-800">Nueva tarea</h2>
        <form class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3" @submit.prevent="addTask">
          <input v-model="draft.title" class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="Título" required />
          <input v-model="draft.date" type="date" class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" required />
          <button class="btn btn-primary justify-center">Agregar</button>
        </form>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-sm font-semibold text-slate-800">Resumen</h2>
        <div class="mt-4 space-y-2 text-sm">
          <p class="flex justify-between"><span class="text-slate-500">Pendientes</span><span class="font-semibold text-slate-800">{{ pendingCount }}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Completadas</span><span class="font-semibold text-slate-800">{{ doneCount }}</span></p>
        </div>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="text-sm font-semibold text-slate-800">Tareas programadas</h2>
      <div class="mt-4 space-y-2">
        <div v-for="task in sortedTasks" :key="task.id" class="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
          <div>
            <p class="text-sm font-medium text-slate-800" :class="{ 'line-through text-slate-400': task.done }">{{ task.title }}</p>
            <p class="text-xs text-slate-500">{{ formatDate(task.date) }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50" @click="toggleTask(task.id)">
              {{ task.done ? 'Reabrir' : 'Completar' }}
            </button>
            <button class="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50" @click="removeTask(task.id)">Eliminar</button>
          </div>
        </div>
        <p v-if="sortedTasks.length === 0" class="text-sm text-slate-500">No tienes tareas todavía.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'edugest_agenda_tasks'
const tasks = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
const draft = ref({ title: '', date: new Date().toISOString().split('T')[0] })

const sortedTasks = computed(() => [...tasks.value].sort((a, b) => new Date(a.date) - new Date(b.date)))
const pendingCount = computed(() => tasks.value.filter((t) => !t.done).length)
const doneCount = computed(() => tasks.value.filter((t) => t.done).length)

watch(tasks, (value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}, { deep: true })

const addTask = () => {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: draft.value.title.trim(),
    date: draft.value.date,
    done: false
  })
  draft.value.title = ''
}

const toggleTask = (id) => {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

const formatDate = (date) => new Date(date).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })
</script>
