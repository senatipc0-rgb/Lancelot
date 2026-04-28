const mysql = require('mysql2/promise');
const config = require('./index');

const pool = mysql.createPool({
  host: config.get('db.host') || 'localhost',
  port: config.get('db.port') || 3306,
  user: config.get('db.user') || 'root',
  password: config.get('db.password') || '',
  database: config.get('db.name') || 'sistema_asistencia',
  connectionLimit: config.get('db.connectionLimit') || 20,
  waitForConnections: true,
  acquireTimeout: 60000,
  timeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

pool.on('connection', () => {
  console.log('✅ Conexión a MySQL establecida');
});

pool.on('error', (err) => {
  console.error('❌ Error de conexión MySQL:', err);
});

// Health check de la base de datos
const checkConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Base de datos conectada correctamente');
    return true;
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    return false;
  }
};

checkConnection();

module.exports = pool;
