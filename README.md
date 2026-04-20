# Lancelot - Sistema de Gestión de Asistencias

 backend completo desarrollado con Express.js y MySQL para la gestión de registros y asistencias de estudiantes.

## 📁 Estructura del Proyecto

```
Lancelot/
├── back-end/           # API REST Express.js + MySQL
│   ├── src/
│   │   ├── config/database.js
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   ├── database/init.sql
│   ├── package.json
│   ├── .env
│   └── README.md
├── database/          # (moved to back-end/database/)
├── package.json       # (moved to back-end/)
└── README.md         # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos
- Node.js (v18 o superior)
- MySQL (v8 o superior)

### Instalación

```bash
cd back-end
npm install
```

### Configuración

1. Edita el archivo `.env` con tus credenciales de MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sistema_asistencia
JWT_SECRET=tu_clave_secreta
```

2. Ejecuta el script SQL para crear la base de datos:

```bash
# Desde MySQL o MySQL Workbench
source back-end/database/init.sql
```

### Ejecución

```bash
cd back-end
npm run dev    # Desarrollo (con nodemon)
# o
npm start      # Producción
```

La API estará disponible en `http://localhost:3000/api`

## 📚 Documentación de la API

Ver el archivo `back-end/README.md` para la documentación completa de endpoints.

## 🔧 Características

- ✅ CRUD completo de estudiantes
- ✅ Registro de asistencias individual y masivo
- ✅ Validación de datos con express-validator
- ✅ Consulta de estadísticas por estudiante
- ✅ Resúmenes diarios de asistencia
- ✅ Manejo centralizado de errores
- ✅ Autenticación JWT (middleware incluido)
- ✅ MySQL con mysql2/promise

## 📊 Modelo de Datos

### Estudiantes
- Código único
- Información personal (nombre, email, teléfono)
- Programa/curso
- Estado (activo, inactivo, graduado, suspendido)

### Asistencias
- Relación con estudiante
- Fecha
- Estado (presente, ausente, tarde, eximido)
- Observaciones

## 🤝 Contribución

Este proyecto es parte del sistema Lancelot. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-functionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-functionalidad`)
5. Abre un Pull Request

## 📄 Licencia

ISC
