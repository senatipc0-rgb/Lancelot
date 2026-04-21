const API_URL = 'http://localhost:3000/api'

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de conexión' }))
    throw new Error(error.message || 'Error en la solicitud')
  }
  const json = await res.json()
  return json.data || json
}

export const estudianteService = {
  getAll: () => fetch(`${API_URL}/estudiantes`).then(handleResponse),
  getById: (id) => fetch(`${API_URL}/estudiantes/${id}`).then(handleResponse),
  create: (data) => fetch(`${API_URL}/estudiantes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  update: (id, data) => fetch(`${API_URL}/estudiantes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  delete: (id) => fetch(`${API_URL}/estudiantes/${id}`, { method: 'DELETE' }).then(handleResponse)
}

export const asistenciaService = {
  getAll: () => fetch(`${API_URL}/asistencias`).then(handleResponse),
  getByEstudiante: (estudianteId) => fetch(`${API_URL}/asistencias/estudiante/${estudianteId}`).then(handleResponse),
  create: (data) => fetch(`${API_URL}/asistencias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse)
}