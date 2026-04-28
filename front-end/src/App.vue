<template>
  <div v-if="isLoginPage" class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
    <router-view />
  </div>
  <div v-else class="min-h-screen bg-slate-100 text-slate-900">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-black/40 md:hidden"
      @click="sidebarOpen = false"
    />

    <aside
      class="sidebar fixed inset-y-0 left-0 z-40 w-64 -translate-x-full bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-2xl transition-transform duration-300 md:translate-x-0"
      :class="{ 'translate-x-0': sidebarOpen }"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div class="border-b border-white/15 px-6 py-5">
        <div class="flex items-center gap-3">
          <div class="text-3xl" aria-hidden="true">🎓</div>
          <div class="flex flex-col">
            <span class="text-lg font-bold tracking-tight">EduGest</span>
            <span class="text-xs text-indigo-100/80">Sistema Académico</span>
          </div>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto px-2 py-4" aria-label="Menú principal">
        <span class="px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-100/70">Menú principal</span>
        <router-link to="/" class="app-nav-link" @click="sidebarOpen = false" aria-label="Inicio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Inicio
        </router-link>
        <router-link to="/estudiantes" class="app-nav-link" @click="sidebarOpen = false" aria-label="Estudiantes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Estudiantes
        </router-link>
        <router-link to="/cursos" class="app-nav-link" @click="sidebarOpen = false" aria-label="Cursos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          Cursos
        </router-link>
        <router-link to="/inscripciones" class="app-nav-link" @click="sidebarOpen = false" aria-label="Inscripciones">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="17"/>
            <line x1="16" y1="17" x2="8" y2="13"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Inscripciones
        </router-link>
        <router-link to="/asistencias" class="app-nav-link" @click="sidebarOpen = false" aria-label="Asistencias">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          Asistencias
        </router-link>
        <router-link to="/usuarios" class="app-nav-link" @click="sidebarOpen = false" aria-label="Usuarios">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Usuarios
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="footer-info">
          <div class="footer-dot"></div>
          <span>Sistema activo</span>
        </div>
      </div>
    </aside>

    <div class="main-wrapper">
      <header class="top-bar">
        <button class="mobile-menu-button" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="search" placeholder="Buscar..." aria-label="Buscar" />
        </div>
        <div class="user-menu">
          <div class="user-avatar" aria-label="Perfil de usuario">{{ userInitial }}</div>
          <button class="logout-btn" @click="handleLogout" title="Cerrar sesión">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </header>

      <main class="page-content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
  name: 'App',
  setup() {
    const sidebarOpen = ref(false)
    const route = useRoute()
    const router = useRouter()
    
    const isLoginPage = computed(() => route.path === '/login')
    
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userInitial = computed(() => {
      return user?.username?.[0]?.toUpperCase() || 'U'
    })
    
    const handleLogout = async () => {
      const result = await Swal.fire({
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro de que deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        await Swal.fire({
          title: '👋 Hasta luego',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          allowOutsideClick: false
        })
        
        router.push('/login')
      }
    }
    
    return {
      sidebarOpen,
      isLoginPage,
      userInitial,
      handleLogout
    }
  }
}
</script>
