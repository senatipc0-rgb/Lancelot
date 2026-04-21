import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudiantesView from '../views/EstudiantesView.vue'
import AsistenciasView from '../views/AsistenciasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/estudiantes', name: 'estudiantes', component: EstudiantesView },
    { path: '/asistencias', name: 'asistencias', component: AsistenciasView }
  ]
})

export default router