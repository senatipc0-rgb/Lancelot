const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'sistema_asistencia',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
};

async function createProfesoresTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS `" + dbConfig.database + "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    await connection.query("USE `" + dbConfig.database + "`");

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS profesores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        telefono VARCHAR(20),
        departamento VARCHAR(100),
        curso_id INT,
        esta_activo BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL ON UPDATE CASCADE,
        UNIQUE KEY unique_email (email),
        INDEX idx_curso_id (curso_id),
        INDEX idx_activo (esta_activo)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableSQL);
    console.log('✅ Tabla profesores creada exitosamente');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (connection) await connection.end();
    process.exit(1);
  }
}

createProfesoresTable();
