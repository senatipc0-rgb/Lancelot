# Comandos para probar la API

## Iniciar el servidor

```bash
cd back-end
npm start
```

---

## Health

```bash
curl http://localhost:3000/api/health
```

---

## Estudiantes

### Listar todos
```bash
curl http://localhost:3000/api/estudiantes
```

### Obtener por ID
```bash
curl http://localhost:3000/api/estudiantes/1
```

### Crear estudiante
```bash
curl -X POST http://localhost:3000/api/estudiantes -H "Content-Type: application/json" -d "{\"codigo_estudiante\":\"EST003\",\"nombres\":\"Carlos\",\"apellidos\":\"Rodriguez\",\"correo\":\"carlos@email.com\",\"telefono\":\"5551234567\",\"programa\":\"Ingeniería de Sistemas\"}"
```

### Actualizar estudiante
```bash
curl -X PUT http://localhost:3000/api/estudiantes/1 -H "Content-Type: application/json" -d "{\"nombres\":\"Juan Carlos\"}"
```

### Eliminar estudiante
```bash
curl -X DELETE http://localhost:3000/api/estudiantes/1
```

---

## Asistencias

### Listar todas
```bash
curl http://localhost:3000/api/asistencias
```

### Por estudiante
```bash
curl http://localhost:3000/api/asistencias/estudiante/1
```

### Registrar asistencia
```bash
curl -X POST http://localhost:3000/api/asistencias -H "Content-Type: application/json" -d "{\"estudiante_id\":1,\"fecha_asistencia\":\"2026-04-21\",\"estado\":\"presente\",\"observacion\":null}"
```

---

## Cursos

### Listar todos
```bash
curl http://localhost:3000/api/cursos
```

### Obtener por ID
```bash
curl http://localhost:3000/api/cursos/1
```

### Crear curso
```bash
curl -X POST http://localhost:3000/api/cursos -H "Content-Type: application/json" -d "{\"nombre\":\"Introduccion a la Programacion\",\"codigo_curso\":\"INF101\",\"descripcion\":\"Curso basico de programacion\",\"creditos\":4,\"grado\":\"10mo\",\"seccion\":\"A\",\"periodo\":\"Enero-Abril\",\"anno\":2026,\"max_estudiantes\":30}"
```

### Actualizar curso
```bash
curl -X PUT http://localhost:3000/api/cursos/1 -H "Content-Type: application/json" -d "{\"nombre\":\"Introduccion a la Programacion\",\"descripcion\":\"Curso actualizado\",\"creditos\":4,\"grado\":\"10mo\",\"seccion\":\"A\",\"periodo\":\"Enero-Abril\",\"anno\":2026,\"max_estudiantes\":30,\"esta_activo\":true}"
```

### Eliminar curso
```bash
curl -X DELETE http://localhost:3000/api/cursos/1
```

---

## Inscripciones

### Listar todas
```bash
curl http://localhost:3000/api/inscripciones
```

### Por estudiante
```bash
curl http://localhost:3000/api/inscripciones/estudiante/1
```

### Por curso
```bash
curl http://localhost:3000/api/inscripciones/curso/1
```

### Inscribir estudiante
```bash
curl -X POST http://localhost:3000/api/inscripciones -H "Content-Type: application/json" -d "{\"estudiante_id\":1,\"curso_id\":1,\"estado\":\"inscrito\",\"nota_final\":null}"
```

### Actualizar inscripción
```bash
curl -X PUT http://localhost:3000/api/inscripciones/1 -H "Content-Type: application/json" -d "{\"estado\":\"completado\",\"nota_final\":85.5}"
```

### Eliminar inscripción
```bash
curl -X DELETE http://localhost:3000/api/inscripciones/1
```

---

## Windows PowerShell

En Windows PowerShell, usa estos comandos:

### GET
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/estudiantes" -Method GET
```

### POST
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/estudiantes" -Method POST -Body ($estudiante | ConvertTo-Json) -ContentType "application/json"
```

### PUT
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/estudiantes/1" -Method PUT -Body ($estudiante | ConvertTo-Json) -ContentType "application/json"
```

### DELETE
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/estudiantes/1" -Method DELETE
```