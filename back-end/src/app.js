require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const config = require('./config');
const morgan = require('morgan');
const winston = require('winston');
const { createProxyMiddleware } = require('http-proxy-middleware');

const studentRoutes = require('./routes/estudiantes');
const attendanceRoutes = require('./routes/asistencias');
const courseRoutes = require('./routes/cursos');
const inscripcionRoutes = require('./routes/inscripciones');
const usuarioRoutes = require('./routes/usuarios');

const app = express();
const PORT = config.get('port');
const ENV = config.get('env');

// ============================================
// 1. CONFIGURACIÓN DE LOGGING SEGURO
// ============================================
const logger = winston.createLogger({
  level: config.get('logging.level'),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'lancelot-system' },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

if (ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Middleware de logging HTTP
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// ============================================
// 2. MIDDLEWARES DE SEGURIDAD
// ============================================

// 2.1 Helmet - Headers HTTP seguros
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' }
}));

// 2.2 CORS - Control de orígenes
const allowedOrigins = config.get('cors.origins');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  maxAge: 86400
}));

// 2.3 Rate Limiting - Protección contra DDoS
const apiLimiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
  message: {
    success: false,
    message: 'Demasiadas solicitudes, intente después'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  handler: (req, res) => {
    logger.warn(`Rate limit excedido: ${req.ip} - ${req.method} ${req.url}`);
    res.status(429).json({
      success: false,
      message: 'Demasiadas solicitudes, intente después',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

app.use('/api/', apiLimiter);

// ============================================
// 3. CONFIGURACIÓN GENERAL
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// ============================================
// 4. HEALTH CHECK
// ============================================
app.get('/api/health', async (req, res) => {
  const health = {
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    environment: ENV,
    services: {
      api: 'operational',
      database: 'connected'
    }
  };
  
  try {
    await require('./config/database').query('SELECT 1');
    logger.info('Health check exitoso');
  } catch (error) {
    health.services.database = 'disconnected';
    health.success = false;
    logger.error('Health check falló:', error);
  }
  
  res.status(health.success ? 200 : 503).json(health);
});

// ============================================
// 5. RUTAS API
// ============================================
app.use('/api/estudiantes', studentRoutes);
app.use('/api/asistencias', attendanceRoutes);
app.use('/api/cursos', courseRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/usuarios', usuarioRoutes);

// ============================================
// 6. RUTA DE DOCUMENTACIÓN API (Swagger)
// ============================================
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lancelot API - Sistema de Gestión de Asistencias',
      version: '1.0.0',
      description: 'API REST para la gestión de estudiantes, cursos, asistencias e inscripciones',
      contact: {
        name: 'Soporte',
        email: 'soporte@sistema.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./back-end/src/routes/*.js', './back-end/src/controllers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ============================================
// 7. MIDDLEWARE DE ERRORES
// ============================================
app.use((req, res) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

app.use(require('./middleware/errorHandler'));

// ============================================
// 8. INICIO DEL SERVIDOR
// ============================================
const server = app.listen(PORT, () => {
  logger.info(`🚀 Servidor iniciado en http://localhost:${PORT}`);
  logger.info(`📚 API disponible en http://localhost:${PORT}/api`);
  logger.info(`📄 Documentación API en http://localhost:${PORT}/api-docs`);
  logger.info(`🌍 Ambiente: ${ENV}`);
  logger.info(`🔒 Seguridad: CORS, Rate Limit, Helmet activados`);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  logger.info('SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    logger.info('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT recibido. Cerrando servidor...');
  server.close(() => {
    logger.info('Servidor cerrado');
    process.exit(0);
  });
});

module.exports = app;
