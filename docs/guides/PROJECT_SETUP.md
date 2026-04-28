# Lancelot - Sistema de Gestión de Asistencias

## Estructura del Proyecto

back-end/    - API REST en Express.js + MySQL
  src/
    config/       - Conexión base de datos
    controllers/  - Lógica de negocio
    models/       - Modelos de base de datos
    routes/       - Rutas API
    middleware/   - Autenticación y manejo de errores
    app.js        - Aplicación principal
  database/
    init.sql      - Esquema de base de datos
  .env           - Variables de entorno
  package.json

front-end/   - SPA en Vue.js + Vite
  src/
    views/        - Componentes de página
    router/       - Configuración de rutas
    services/     - Cliente API
    App.vue       - Layout principal
    main.js       - Entrada de aplicación
  public/
  vite.config.js
  package.json

## Características

Back-end:
- ✅ CRUD completo de estudiantes
- ✅ Registro de asistencias (individual y masivo)
- ✅ Gestión de cursos
- ✅ Gestión de inscripciones
- ✅ Autenticación JWT
- ✅ Validación de solicitudes
- ✅ Manejo centralizado de errores

Front-end:
- ✅ Dashboard responsivo
- ✅ Gestión de estudiantes
- ✅ Registro de asistencias
- ✅ Catálogo de cursos
- ✅ Gestión de inscripciones
- ✅ Sistema de login con JWT
- ✅ Menú de navegación
- ✅ Estadísticas

## Inicio Rápido

1. Base de datos:
   mysql -u root -p < back-end/database/init.sql

2. Configurar back-end/.env

3. Iniciar back-end:
   cd back-end && npm start
   API: http://localhost:3000/api

4. Iniciar front-end:
   cd front-end && npm run dev
   App: http://localhost:5173

## Estado del Proyecto

✅ Totalmente funcional y operativo
✅ Todas las operaciones CRUD implementadas
✅ Sistema de autenticación funcionando
✅ UI front-end completa
✅ Migraciones de base de datos listas
✅ Documentación de API incluida
