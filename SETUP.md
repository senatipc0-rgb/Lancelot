# Lancelot - Sistema de Gestión de Asistencias
## Complete Setup Guide

### Status
✅ Back-end: Running on http://localhost:3000  
✅ Front-end: Running on http://localhost:5173  
⚠️ Database: Requires initialization

---

## Quick Start (After DB Setup)

### 1. Back-end (Port 3000)
```bash
cd back-end
npm start
```

### 2. Front-end (Port 5173)
```bash
cd front-end
npm run dev
```

---

## Database Setup

MySQL is installed and running but requires authentication.

### Option 1: Import with password prompt
```bash
mysql -u root -p < back-end/database/init.sql
```

### Option 2: Create user
```sql
CREATE USER 'lancelot'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON sistema_asistencia.* TO 'lancelot'@'localhost';
FLUSH PRIVILEGES;
```
Update .env with DB_USER=lancelot, DB_PASSWORD=password

---

## Key Features

### Back-end (Express.js + MySQL)
- CRUD completo de estudiantes
- Registro de asistencias (individual y masivo)
- Gestión de cursos e inscripciones
- Autenticación JWT
- Validación de datos
- Manejo de errores centralizado

### Front-end (Vue.js + Vite)
- Dashboard interactivo
- Gestión de estudiantes, cursos, inscripciones, asistencias
- Sistema de login con JWT
- Diseño responsivo con Bootstrap 5

---

## API Endpoints

- GET /api/health - Health check
- GET/POST /api/estudiantes - Students
- GET/POST /api/asistencias - Attendance
- POST /api/asistencias/bulk - Bulk attendance
- GET/POST /api/cursos - Courses
- GET/POST /api/inscripciones - Enrollments
- POST /api/usuarios/login - Login
- POST /api/usuarios/register - Register

---

## Files Modified

1. back-end/src/models/Asistencia.js (Line 130)
   - Fixed: FROM asistencia -> FROM asistencias

2. back-end/.env (Created)
   - Environment configuration

3. setup_database.sh (Created)
   - DB initialization helper

---

Technology Stack: Node.js, Express.js, MySQL, Vue.js, Vite, Bootstrap 5
License: ISC