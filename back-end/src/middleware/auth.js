const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de acceso'
      });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({
        success: false,
        message: 'Formato de token inválido'
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        success: false,
        message: 'Formato de token inválido'
      });
    }

    jwt.verify(token, config.get('jwt.secret'), {
      issuer: 'lancelot-system'
    }, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            message: 'Token expirado, por favor renueve su sesión'
          });
        }
        return res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
      }

      // Verificar que sea un token de acceso
      if (decoded.type !== 'access') {
        return res.status(401).json({
          success: false,
          message: 'Tipo de token inválido'
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error en la autenticación'
    });
  }
};

module.exports = auth;
