import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudiantesView from '../views/EstudiantesView.vue'
import AsistenciasView from '../views/AsistenciasView.vue'
import CursosView from '../views/CursosView.vue'
import InscripcionesView from '../views/InscripcionesView.vue'
import LoginView from '../views/LoginView.vue'
import ReportesView from '../views/ReportesView.vue'
import AgendaView from '../views/AgendaView.vue'
import NotificacionesView from '../views/NotificacionesView.vue'
import ConfiguracionView from '../views/ConfiguracionView.vue'
import UsuariosView from '../views/UsuariosView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/estudiantes', name: 'estudiantes', component: EstudiantesView, meta: { requiresAuth: true } },
  { path: '/asistencias', name: 'asistencias', component: AsistenciasView, meta: { requiresAuth: true } },
  { path: '/cursos', name: 'cursos', component: CursosView, meta: { requiresAuth: true } },
  { path: '/inscripciones', name: 'inscripciones', component: InscripcionesView, meta: { requiresAuth: true } },
  { path: '/reportes', name: 'reportes', component: ReportesView, meta: { requiresAuth: true } },
  { path: '/agenda', name: 'agenda', component: AgendaView, meta: { requiresAuth: true } },
  { path: '/notificaciones', name: 'notificaciones', component: NotificacionesView, meta: { requiresAuth: true } },
  { path: '/configuracion', name: 'configuracion', component: ConfiguracionView, meta: { requiresAuth: true } },
  { path: '/usuarios', name: 'usuarios', component: UsuariosView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }

  if (to.path === '/login' && isAuthenticated) {
    return '/'
  }

  return true
})

export default router