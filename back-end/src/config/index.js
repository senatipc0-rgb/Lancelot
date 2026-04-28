const convict = require('convict');
const path = require('path');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  db: {
    host: {
      doc: 'Database host',
      format: String,
      default: 'localhost',
      env: 'DB_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 3306,
      env: 'DB_PORT'
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'root',
      env: 'DB_USER'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: '',
      env: 'DB_PASSWORD'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'sistema_asistencia',
      env: 'DB_NAME'
    },
    connectionLimit: {
      doc: 'Connection pool limit',
      format: 'int',
      default: 10,
      env: 'DB_CONNECTION_LIMIT'
    }
  },
  jwt: {
    secret: {
      doc: 'JWT secret key',
      format: String,
      default: 'lancelot_secret_key_2026',
      env: 'JWT_SECRET'
    },
    expiresIn: {
      doc: 'JWT expiration time',
      format: String,
      default: '15m',
      env: 'JWT_EXPIRES_IN'
    },
    refreshExpiresIn: {
      doc: 'Refresh token expiration time',
      format: String,
      default: '7d',
      env: 'JWT_REFRESH_EXPIRES_IN'
    }
  },
  cors: {
    origins: {
      doc: 'Allowed CORS origins',
      format: Array,
      default: ['http://localhost:3000', 'http://localhost:5173'],
      env: 'ALLOWED_ORIGINS'
    }
  },
  rateLimit: {
    windowMs: {
      doc: 'Rate limit window in milliseconds',
      format: 'int',
      default: 15 * 60 * 1000, // 15 minutes
      env: 'RATE_LIMIT_WINDOW'
    },
    max: {
      doc: 'Max requests per window',
      format: 'int',
      default: 100,
      env: 'RATE_LIMIT_MAX'
    }
  },
  logging: {
    level: {
      doc: 'Logging level',
      format: ['error', 'warn', 'info', 'debug'],
      default: 'info',
      env: 'LOG_LEVEL'
    },
    directory: {
      doc: 'Log directory',
      format: String,
      default: path.join(__dirname, '../../logs'),
      env: 'LOG_DIRECTORY'
    }
  }
});

const env = config.get('env');
const configFile = path.join(__dirname, `../../config/${env}.json`);

// Load environment-specific config if it exists
try {
  const fs = require('fs');
  if (fs.existsSync(configFile)) {
    config.loadFile(configFile);
  }
} catch (err) {
  // No config file, use defaults
}

config.validate({ allowed: 'strict' });

module.exports = config;
