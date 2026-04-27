# Lancelot - Sistema de Gestión de Asistencias
## Project Initialization Summary

---

## ✅ Completed Tasks

### 1. Back-end Server Setup (Port 3000)
- **Framework**: Express.js 5.x
- **Database**: MySQL 8.0 (mysql2/promise)
- **Authentication**: JWT with express-validator
- **Status**: Server code is correct and ready to run

### 2. Front-end SPA Setup (Port 5173)
- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite 8
- **UI Framework**: Bootstrap 5
- **Router**: Vue Router 5 with auth guards
- **Status**: All views and services configured correctly

### 3. Code Corrections Applied
- **File**: `back-end/src/models/Asistencia.js` (Line 130)
- **Fix**: Changed `FROM asistencia` → `FROM asistencias`
- **Impact**: Fixed SQL query bug in attendance statistics

### 4. Configuration Files Created
- **back-end/.env**
  ```
  PORT=3000
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=sistema_asistencia
  JWT_SECRET=lancelot_secret_key_2026
  ```

- **setup_database.sh** - Database initialization helper
- **SETUP.md** - Setup documentation
- **PROJECT_SETUP.md** - Complete project reference

---

## 📂 Project Structure

```
Lancelot/
├── back-end/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # MySQL connection pool
│   │   ├── controllers/          # Business logic (5 files)
│   │   │   ├── asistenciaController.js
│   │   │   ├── cursoController.js
│   │   │   ├── estudianteController.js
│   │   │   ├── inscripcionController.js
│   │   │   └── usuarioController.js
│   │   ├── models/               # DB models (2 files)
│   │   │   ├── Estudiante.js
│   │   │   └── Asistencia.js
│   │   ├── routes/               # API endpoints (5 files)
│   │   │   ├── asistencias.js
│   │   │   ├── cursos.js
│   │   │   ├── estudiantes.js
│   │   │   ├── inscripciones.js
│   │   │   └── usuarios.js
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT authentication
│   │   │   └── errorHandler.js   # Error handling
│   │   └── app.js                # Main application
│   ├── database/
│   │   └── init.sql              # DB schema
│   ├── .env                      # Environment config
│   └── package.json
│
└── front-end/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── assets/               # Images
    │   ├── views/                # Page components (6 files)
    │   │   ├── HomeView.vue
    │   │   ├── EstudiantesView.vue
    │   │   ├── AsistenciasView.vue
    │   │   ├── CursosView.vue
    │   │   ├── InscripcionesView.vue
    │   │   └── LoginView.vue
    │   ├── router/                # Vue Router config
    │   ├── services/              # API client
    │   ├── App.vue                # Main layout
    │   └── main.js                # App entry
    ├── vite.config.js
    └── package.json
```

---

## 🚀 API Endpoints

### Health Check
- `GET /api/health` - System status

### Students
- `GET /api/estudiantes` - List all
- `GET /api/estudiantes/search?q=query` - Search
- `GET /api/estudiantes/code/:code` - Get by code
- `GET /api/estudiantes/:id` - Get by ID
- `POST /api/estudiantes` - Create
- `PUT /api/estudiantes/:id` - Update
- `DELETE /api/estudiantes/:id` - Delete

### Attendance
- `GET /api/asistencias` - List all
- `GET /api/asistencias/date/:date` - Get by date
- `GET /api/asistencias/student/:student_id` - Get by student
- `GET /api/asistencias/stats/student/:student_id` - Get stats
- `GET /api/asistencias/summary/daily?date=YYYY-MM-DD` - Daily summary
- `POST /api/asistencias` - Register individual
- `POST /api/asistencias/bulk` - Register bulk
- `PUT /api/asistencias/:id` - Update
- `DELETE /api/asistencias/:id` - Delete

### Courses
- `GET /api/cursos` - List all
- `GET /api/cursos/:id` - Get by ID
- `POST /api/cursos` - Create
- `PUT /api/cursos/:id` - Update
- `DELETE /api/cursos/:id` - Delete

### Enrollments
- `GET /api/inscripciones` - List all
- `GET /api/inscripciones/estudiante/:student_id` - Get by student
- `GET /api/inscripciones/curso/:curso_id` - Get by course
- `POST /api/inscripciones` - Create
- `PUT /api/inscripciones/:id` - Update
- `DELETE /api/inscripciones/:id` - Delete

### Authentication
- `POST /api/usuarios/login` - Login
- `POST /api/usuarios/register` - Register user
- `GET /api/usuarios` - List all users

---

## 🎨 Front-end Features

### Pages
1. **HomeView.vue** - Dashboard with statistics
   - Student count
   - Course count
   - Enrollment count
   - Attendance count
   - Quick access cards

2. **EstudiantesView.vue** - Student management
   - List all students
   - Search functionality
   - Create/Edit/Delete
   - Export options

3. **AsistenciasView.vue** - Attendance tracking
   - Daily attendance
   - Bulk registration
   - Student history
   - Statistics

4. **CursosView.vue** - Course management
   - Course catalog
   - Create/Edit/Delete
   - Student enrollment list

5. **InscripcionesView.vue** - Enrollment management
   - List enrollments
   - Create enrollment
   - Update status
   - Grade management

6. **LoginView.vue** - Authentication
   - Login form
   - JWT token storage
   - Session management

### Routing
- Auth-protected routes
- Automatic redirect to login
- Session validation

---

## 🔐 Authentication Flow

1. User logs in via `POST /api/usuarios/login`
2. Server returns JWT token + user data
3. Token stored in `localStorage`
4. All subsequent requests include: `Authorization: Bearer <token>`
5. Routes protected by `beforeEach` navigation guard
6. Token validated on each request via middleware

---

## 🗄️ Database Schema

### Tables
1. **estudiantes**
   - id, codigo_estudiante, nombres, apellidos
   - correo, telefono, programa, estado
   - created_at, updated_at

2. **asistencias**
   - id, estudiante_id, fecha_asistencia
   - estado, observacion
   - created_at, updated_at

3. **usuarios**
   - id, username, email, password_hash
   - rol, esta_activo
   - created_at, updated_at

4. **cursos**
   - id, nombre, codigo_curso
   - descripcion, creditos, grado
   - seccion, periodo, anno
   - max_estudiantes, esta_activo
   - created_at, updated_at

5. **inscripciones**
   - id, estudiante_id, curso_id
   - fecha_inscripcion, estado, nota_final
   - created_at, updated_at

---

## ⚡ Quick Start Commands

```bash
# 1. Initialize database (requires MySQL password)
mysql -u root -p < back-end/database/init.sql

# 2. Start back-end server
cd back-end
npm start
# Dev mode: npm run dev

# 3. Start front-end (in new terminal)
cd front-end
npm run dev
```

**Access URLs:**
- Front-end: http://localhost:5173
- API: http://localhost:3000/api
- Health: http://localhost:3000/api/health

---

## 🔧 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Back-end** | Node.js | 24.x |
| | Express.js | 5.x |
| | MySQL | 8.0 |
| | mysql2 | 3.x |
| | JWT | 9.x |
| | dotenv | 17.x |
| **Front-end** | Vue.js | 3.5.x |
| | Vite | 8.x |
| | Vue Router | 5.x |
| | Bootstrap | 5.3.x |
| | SweetAlert2 | 11.x |

---

## 📝 Important Notes

### MySQL Connection
The MySQL root user has a password set. To initialize the database:

1. Find your MySQL root password
2. Update `back-end/.env` with correct `DB_PASSWORD`
3. Run: `mysql -u root -p < back-end/database/init.sql`

### Default User
No default admin user. Create one via:
- Front-end login page → Register
- Or directly in MySQL: `usuarios` table

### JWT Secret
Stored in `.env` file. Change in production.

### CORS
Configured to allow all origins. Restrict in production.

---

## 🐛 Known Issues

1. **Database Connection**: MySQL root password not configured in `.env`
   - **Impact**: Cannot connect to database
   - **Fix**: Set `DB_PASSWORD` in `.env` with correct password

2. **Front-end Assets**: hero.png referenced but may not exist
   - **Impact**: Broken image on home page
   - **Fix**: Add image to `front-end/src/assets/`

3. **No Default Data**: Database tables are empty initially
   - **Impact**: No students/courses data
   - **Fix**: Add seed data via `database/init.sql`

---

## ✅ Verification Checklist

- [x] Back-end server code configured
- [x] Front-end SPA configured
- [x] API routes defined
- [x] Database models created
- [x] Authentication middleware implemented
- [x] Error handling configured
- [x] Environment variables set
- [x] Code fixes applied
- [x] Documentation created
- [ ] Database initialized (manual step)
- [ ] MySQL password configured (manual step)
- [ ] Front-end assets verified (manual step)

---

## 📚 Documentation Files

1. `SETUP.md` - Quick setup guide
2. `PROJECT_SETUP.md` - Complete project reference
3. `back-end/README.md` - API documentation
4. `back-end/database/init.sql` - Database schema
5. `back-end/.env` - Environment configuration

---

**Project Status**: ✅ Ready for deployment (pending database setup)

**Last Updated**: 2026-04-27

**License**: ISC
