<template>
  <div class="space-y-6">
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-6 shadow-xl md:p-8">
      <div class="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10"></div>
      <div class="absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-white/5"></div>
      <div class="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span class="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">Sistema Académico</span>
          <h1 class="mt-3 text-3xl font-bold text-white md:text-4xl">Bienvenido a EduGest</h1>
          <p class="mt-2 max-w-2xl text-sm text-blue-50 md:text-base">Gestiona estudiantes, cursos, inscripciones y asistencias desde un solo lugar.</p>
        </div>
        <div class="text-6xl drop-shadow-lg md:text-7xl">🎓</div>
      </div>
      <div class="relative z-10 mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div class="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
          <p class="text-2xl font-bold text-white">{{ stats.estudiantes }}</p>
          <p class="text-xs font-medium uppercase tracking-wider text-blue-100">Estudiantes</p>
        </div>
        <div class="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
          <p class="text-2xl font-bold text-white">{{ stats.cursos }}</p>
          <p class="text-xs font-medium uppercase tracking-wider text-blue-100">Cursos</p>
        </div>
        <div class="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
          <p class="text-2xl font-bold text-white">{{ stats.inscripciones }}</p>
          <p class="text-xs font-medium uppercase tracking-wider text-blue-100">Inscripciones</p>
        </div>
        <div class="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
          <p class="text-2xl font-bold text-white">{{ stats.asistencias }}</p>
          <p class="text-xs font-medium uppercase tracking-wider text-blue-100">Asistencias</p>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Acceso rápido</h2>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <router-link to="/estudiantes" class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50">
          <div class="rounded-lg bg-blue-100 p-2 text-blue-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-800">Estudiantes</p>
            <p class="text-xs text-slate-500">Gestiona el padrón estudiantil</p>
          </div>
          <span class="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-600">›</span>
        </router-link>

        <router-link to="/cursos" class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50">
          <div class="rounded-lg bg-violet-100 p-2 text-violet-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-800">Cursos</p>
            <p class="text-xs text-slate-500">Administra la oferta académica</p>
          </div>
          <span class="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-600">›</span>
        </router-link>

        <router-link to="/inscripciones" class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50">
          <div class="rounded-lg bg-emerald-100 p-2 text-emerald-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-800">Inscripciones</p>
            <p class="text-xs text-slate-500">Relaciona estudiantes y cursos</p>
          </div>
          <span class="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-600">›</span>
        </router-link>

        <router-link to="/asistencias" class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50">
          <div class="rounded-lg bg-amber-100 p-2 text-amber-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-800">Asistencias</p>
            <p class="text-xs text-slate-500">Control diario de clases</p>
          </div>
          <span class="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-600">›</span>
        </router-link>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <router-link to="/usuarios" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Nuevo módulo</p>
        <h3 class="mt-2 text-lg font-bold text-slate-800">Usuarios</h3>
        <p class="mt-1 text-sm text-slate-500">CRUD de usuarios y administración de roles.</p>
      </router-link>
      <router-link to="/reportes" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Nuevo módulo</p>
        <h3 class="mt-2 text-lg font-bold text-slate-800">Reportes</h3>
        <p class="mt-1 text-sm text-slate-500">Indicadores y análisis académicos.</p>
      </router-link>
      <router-link to="/agenda" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Nuevo módulo</p>
        <h3 class="mt-2 text-lg font-bold text-slate-800">Agenda</h3>
        <p class="mt-1 text-sm text-slate-500">Planificación de actividades internas.</p>
      </router-link>
      <router-link to="/notificaciones" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Nuevo módulo</p>
        <h3 class="mt-2 text-lg font-bold text-slate-800">Notificaciones</h3>
        <p class="mt-1 text-sm text-slate-500">Alertas automáticas del sistema.</p>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { estudianteService, cursoService, inscripcionService, asistenciaService } from '../services/api'

const stats = ref({ estudiantes: '—', cursos: '—', inscripciones: '—', asistencias: '—' })

onMounted(async () => {
  try {
    const [est, cur, ins, asi] = await Promise.all([
      estudianteService.getAll(),
      cursoService.getAll(),
      inscripcionService.getAll(),
      asistenciaService.getAll()
    ])
    stats.value = {
      estudiantes: est.length,
      cursos: cur.length,
      inscripciones: ins.length,
      asistencias: asi.length
    }
  } catch (_) {}
})
</script>
