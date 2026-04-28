import Swal from 'sweetalert2'

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})

export const toastSuccess = (title, timer = 1400) => toast.fire({ icon: 'success', title, timer })

export const alertError = (text, title = 'Error') => Swal.fire({
  icon: 'error',
  title,
  text: text || 'Ocurrió un error inesperado'
})

export const confirmDelete = (title = '¿Eliminar registro?') => Swal.fire({
  title,
  text: 'Esta acción no se puede deshacer.',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sí, eliminar',
  cancelButtonText: 'Cancelar',
  confirmButtonColor: '#dc2626',
  cancelButtonColor: '#6b7280'
})

export const alertSuccess = (title, text, timer = 1500) => Swal.fire({
  icon: 'success',
  title,
  text,
  timer,
  showConfirmButton: false
})
