# Comandos MySQL - Sistema de Gestión de Asistencias

## Conexión a MySQL

```bash
# Desde línea de comandos
mysql -u root -p

# O desde MySQL Workbench
# Conectar a localhost:3306
```

## Crear Base de Datos

```sql
CREATE DATABASE IF NOT EXISTS sistema_asistencia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sistema_asistencia;
```

## Tablas

### Estudiantes

```sql
CREATE TABLE IF NOT EXISTS estudiantes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo_estudiante VARCHAR(20) UNIQUE NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  programa VARCHAR(150) NOT NULL,
  estado ENUM('activo', 'inactivo', 'graduado', 'suspendido') DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_codigo_estudiante (codigo_estudiante),
  INDEX idx_correo (correo),
  INDEX idx_estado (estado),
  INDEX idx_programa (programa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Asistencias

```sql
CREATE TABLE IF NOT EXISTS asistencias (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estudiante_id INT NOT NULL,
  fecha_asistencia DATE NOT NULL,
  estado ENUM('presente', 'ausente', 'tarde', 'eximido') NOT NULL DEFAULT 'presente',
  observacion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY unique_estudiante_fecha (estudiante_id, fecha_asistencia),
  INDEX idx_fecha_asistencia (fecha_asistencia),
  INDEX idx_estudiante_id (estudiante_id),
  INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Usuarios

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('administrador', 'docente', 'personal') DEFAULT 'personal',
  esta_activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Cursos

```sql
CREATE TABLE IF NOT EXISTS cursos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(150) NOT NULL,
  codigo_curso VARCHAR(20) UNIQUE NOT NULL,
  descripcion TEXT,
  creditos INT DEFAULT 0,
  grado VARCHAR(50),
  seccion VARCHAR(10),
  periodo VARCHAR(50),
  anno INT,
  max_estudiantes INT DEFAULT 30,
  esta_activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_codigo_curso (codigo_curso),
  INDEX idx_periodo (periodo),
  INDEX idx_anno (anno)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Inscripciones

```sql
CREATE TABLE IF NOT EXISTS inscripciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estudiante_id INT NOT NULL,
  curso_id INT NOT NULL,
  fecha_inscripcion DATE NOT NULL,
  estado ENUM('inscrito', 'retirado', 'completado', 'reprobado') DEFAULT 'inscrito',
  nota_final DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY unique_estudiante_curso (estudiante_id, curso_id),
  INDEX idx_estudiante_id (estudiante_id),
  INDEX idx_curso_id (curso_id),
  INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Ejecución Rápida

```bash
# Ejecutar archivo init.sql
mysql -u root -p < back-end/database/init.sql

# O desde MySQL
SOURCE back-end/database/init.sql;
```

## Consultas de Ejemplo

```sql
-- Ver todas las tablas
SHOW TABLES;

-- Ver estudiantes
SELECT * FROM estudiantes;

-- Ver asimteDncias de un estudiante
SELECT * FROM asistencias WHERE estudiante_id = 1;
```