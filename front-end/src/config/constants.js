/**
 * Configuración global de la aplicación EduGest
 */

export const APP_NAME = 'EduGest'
export const APP_VERSION = '1.0.0'
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Constantes de roles
 */
export const ROLES = {
  ADMIN: 'Administrador',
  TEACHER: 'Docente',
  STUDENT: 'Estudiante'
}

/**
 * Constantes de estado
 */
export const STATUS = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  PENDING: 'Pendiente',
  REJECTED: 'Rechazado'
}

/**
 * Constantes de mensajes
 */
export const MESSAGES = {
  SAVE_SUCCESS: 'Los cambios se guardaron correctamente',
  DELETE_SUCCESS: 'El registro fue eliminado',
  ERROR_GENERIC: 'Ocurrió un error inesperado',
  CONFIRM_DELETE: '¿Estás seguro de que deseas eliminar este registro?',
  LOADING: 'Cargando...'
}

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  STUDENTS: '/estudiantes',
  COURSES: '/cursos',
  INSCRIPTIONS: '/inscripciones',
  ATTENDANCE: '/asistencias',
  USERS: '/usuarios',
  REPORTS: '/reportes',
  AGENDA: '/agenda',
  NOTIFICATIONS: '/notificaciones',
  SETTINGS: '/configuracion'
}

/**
 * Colores por variant
 */
export const COLORS = {
  primary: '#2563eb',
  secondary: '#6366f1',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#0ea5e9'
}
