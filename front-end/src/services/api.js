const API_URL = 'http://localhost:3000/api'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

const handleResponse = async (res) => {
  try {
    const json = await res.json()
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Error en la solicitud')
    }
    return json.data || json
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error('No se pudo conectar al servidor')
    }
    throw e
  }
}

const api = {
  get: (endpoint) => fetch(`${API_URL}/${endpoint}`, { 
    headers: getHeaders() 
  }).then(handleResponse),
  
  post: (endpoint, data) => fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(handleResponse),
  
  put: (endpoint, data) => fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(handleResponse),
  
  delete: (endpoint) => fetch(`${API_URL}/${endpoint}`, { 
    method: 'DELETE',
    headers: getHeaders() 
  }).then(handleResponse)
}

export const estudianteService = {
  getAll: () => api.get('estudiantes'),
  getById: (id) => api.get(`estudiantes/${id}`),
  create: (data) => api.post('estudiantes', data),
  update: (id, data) => api.put(`estudiantes/${id}`, data),
  delete: (id) => api.delete(`estudiantes/${id}`)
}

export const asistenciaService = {
  getAll: () => api.get('asistencias'),
  getByEstudiante: (estudianteId) => api.get(`asistencias/estudiante/${estudianteId}`),
  create: (data) => api.post('asistencias', data)
}

export const cursoService = {
  getAll: () => api.get('cursos'),
  getById: (id) => api.get(`cursos/${id}`),
  create: (data) => api.post('cursos', data),
  update: (id, data) => api.put(`cursos/${id}`, data),
  delete: (id) => api.delete(`cursos/${id}`)
}

export const inscripcionService = {
  getAll: () => api.get('inscripciones'),
  getByEstudiante: (estudianteId) => api.get(`inscripciones/estudiante/${estudianteId}`),
  getByCurso: (cursoId) => api.get(`inscripciones/curso/${cursoId}`),
  create: (data) => api.post('inscripciones', data),
  update: (id, data) => api.put(`inscripciones/${id}`, data),
  delete: (id) => api.delete(`inscripciones/${id}`)
}

export default api