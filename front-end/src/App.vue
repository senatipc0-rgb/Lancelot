<template>
  <div class="layout" :class="{ 'sidebar-open': sidebarOpen }">
    <!-- Overlay for mobile -->
    <div class="overlay" @click="sidebarOpen = false" />

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">🎓</div>
        <div class="logo-text">
          <span class="logo-title">EduGest</span>
          <span class="logo-sub">Sistema Académico</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <span class="nav-label">Menú principal</span>
        <router-link to="/" exact-active-class="active" class="nav-item" @click="sidebarOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Inicio
        </router-link>
        <router-link to="/estudiantes" class="nav-item" @click="sidebarOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Estudiantes
        </router-link>
        <router-link to="/cursos" class="nav-item" @click="sidebarOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Cursos
        </router-link>
        <router-link to="/inscripciones" class="nav-item" @click="sidebarOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Inscripciones
        </router-link>
        <router-link to="/asistencias" class="nav-item" @click="sidebarOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          Asistencias
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="footer-info">
          <div class="footer-dot"></div>
          <span>Sistema activo</span>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="main-wrapper">
      <!-- Top bar -->
      <header class="topbar">
        <button class="menu-btn" @click="sidebarOpen = !sidebarOpen" aria-label="Menú">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="topbar-title">
          <h1>{{ currentTitle }}</h1>
        </div>
        <div class="topbar-right">
          <button class="logout-btn" @click="logout" title="Cerrar Sesión">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
          <div class="avatar">{{ getUserInitials() }}</div>
        </div>
      </header>

      <main class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const sidebarOpen = ref(false)
const route = useRoute()

const titles = {
  home: 'Inicio',
  estudiantes: 'Estudiantes',
  cursos: 'Cursos',
  inscripciones: 'Inscripciones',
  asistencias: 'Asistencias',
  login: 'Iniciar Sesión'
}

const currentTitle = computed(() => titles[route.name] || 'EduGest')

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}

const getUserInitials = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.username ? user.username.substring(0, 2).toUpperCase() : 'AD'
}
</script>

<style>
/* ─── Layout ─────────────────────────────────────────────────── */
.layout {
  display: flex;
  min-height: 100vh;
}

/* ─── Sidebar ────────────────────────────────────────────────── */
.sidebar {
  width: var(--sidebar-w);
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 200;
  transition: transform var(--transition);
  overflow-y: auto;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid var(--border-light);
}

.logo-icon {
  font-size: 1.75rem;
  line-height: 1;
  background: var(--primary-muted);
  width: 42px;
  height: 42px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-title {
  display: block;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
  line-height: 1.2;
}

.logo-sub {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 400;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-light);
  padding: 0.5rem 0.5rem 0.25rem;
  display: block;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background var(--transition), color var(--transition);
}

.nav-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity var(--transition);
}

.nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}

.nav-item:hover svg { opacity: 1; }

.nav-item.active,
.nav-item.router-link-active {
  background: var(--primary-muted);
  color: var(--primary);
  font-weight: 600;
}

.nav-item.active svg,
.nav-item.router-link-active svg { opacity: 1; }

.sidebar-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-light);
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.footer-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--success);
  flex-shrink: 0;
  box-shadow: 0 0 0 2px var(--success-light);
}

/* ─── Main wrapper ───────────────────────────────────────────── */
.main-wrapper {
  flex: 1;
  margin-left: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0;
}

/* ─── Topbar ─────────────────────────────────────────────────── */
.topbar {
  height: var(--header-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 0.375rem;
  border-radius: var(--radius-sm);
  transition: background var(--transition), color var(--transition);
}

.menu-btn:hover { background: var(--surface-2); color: var(--text); }

.menu-btn svg { width: 20px; height: 20px; display: block; }

.topbar-title { flex: 1; }

.topbar-title h1 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.topbar-right { display: flex; align-items: center; gap: 0.75rem; }

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 0.375rem;
  border-radius: var(--radius-sm);
  transition: background var(--transition), color var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:hover {
  background: var(--surface-2);
  color: var(--text);
}

.logout-btn svg {
  width: 20px;
  height: 20px;
  display: block;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #7c3aed);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  letter-spacing: 0.05em;
}

/* ─── Content ────────────────────────────────────────────────── */
.content {
  flex: 1;
  padding: 1.75rem;
  overflow-x: hidden;
}

/* ─── Overlay (mobile) ───────────────────────────────────────── */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 150;
  backdrop-filter: blur(2px);
}

/* ─── Page transition ────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-leave-to { opacity: 0; transform: translateY(-4px); }

/* ─── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .layout.sidebar-open .sidebar {
    transform: translateX(0);
  }

  .layout.sidebar-open .overlay {
    display: block;
  }

  .main-wrapper {
    margin-left: 0;
  }

  .menu-btn {
    display: flex;
  }

  .content {
    padding: 1rem;
  }
}
</style>
