import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudiantesView from '../views/EstudiantesView.vue'
import AsistenciasView from '../views/AsistenciasView.vue'
import CursosView from '../views/CursosView.vue'
import InscripcionesView from '../views/InscripcionesView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/estudiantes', name: 'estudiantes', component: EstudiantesView, meta: { requiresAuth: true } },
  { path: '/asistencias', name: 'asistencias', component: AsistenciasView, meta: { requiresAuth: true } },
  { path: '/cursos', name: 'cursos', component: CursosView, meta: { requiresAuth: true } },
  { path: '/inscripciones', name: 'inscripciones', component: InscripcionesView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router