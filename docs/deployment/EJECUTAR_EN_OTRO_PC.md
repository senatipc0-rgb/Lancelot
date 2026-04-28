# Ejecutar el proyecto en otra computadora

## Requisitos previos

- Node.js 18+ instalado
- MySQL 8.0+ instalado y corriendo

## Pasos

### 1. Base de datos

1. Abrir MySQL Workbench o terminal MySQL
2. Ejecutar el script `back-end/database/init.sql`

```sql
SOURCE path/hacia/back-end/database/init.sql;
```

### 2. Backend

```bash
cd back-end
npm install
npm start
```

El backend estará disponible en `http://localhost:3000`

### 3. Frontend

```bash
cd front-end
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Configuración de base de datos

Si MySQL tiene usuario o contraseña diferente, editar `back-end/.env`:

```
DB_USER=root
DB_PASSWORD=tu_contraseña
```