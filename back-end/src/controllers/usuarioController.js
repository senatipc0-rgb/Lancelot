const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Almacenamiento temporal de refresh tokens (en producción usar Redis)
const refreshTokens = new Map();

const usuarioController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Usuario y contraseña son requeridos'
        });
      }

      const [users] = await db.execute(
        'SELECT id, username, email, rol, esta_activo FROM usuarios WHERE username = ? AND esta_activo = TRUE',
        [username]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const user = users[0];
      const [passwordRows] = await db.execute(
        'SELECT password_hash FROM usuarios WHERE id = ?',
        [user.id]
      );

      if (passwordRows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const validPassword = await bcrypt.compare(password, passwordRows[0].password_hash);
      
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Generar tokens con expiración corta
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          rol: user.rol,
          type: 'access'
        },
        config.get('jwt.secret'),
        { 
          expiresIn: config.get('jwt.expiresIn'),
          issuer: 'lancelot-system'
        }
      );

      const refreshToken = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          rol: user.rol,
          type: 'refresh'
        },
        config.get('jwt.secret'),
        { 
          expiresIn: config.get('jwt.refreshExpiresIn'),
          issuer: 'lancelot-system'
        }
      );

      // Almacenar refresh token
      refreshTokens.set(user.id, refreshToken);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          token,
          refreshToken,
          expiresIn: config.get('jwt.expiresIn'),
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            rol: user.rol
          }
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error en el servidor'
      });
    }
  },

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Token de renovación requerido'
        });
      }

      // Verificar refresh token
      const decoded = jwt.verify(refreshToken, config.get('jwt.secret'), {
        issuer: 'lancelot-system'
      });

      // Verificar que el token esté almacenado
      const storedToken = refreshTokens.get(decoded.id);
      if (storedToken !== refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Token de renovación inválido'
        });
      }

      // Buscar usuario
      const [users] = await db.execute(
        'SELECT id, username, email, rol FROM usuarios WHERE id = ? AND esta_activo = TRUE',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no encontrado o inactivo'
        });
      }

      const user = users[0];

      // Generar nuevo access token
      const newToken = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          rol: user.rol,
          type: 'access'
        },
        config.get('jwt.secret'),
        { 
          expiresIn: config.get('jwt.expiresIn'),
          issuer: 'lancelot-system'
        }
      );

      res.json({
        success: true,
        message: 'Token renovado',
        data: {
          token: newToken,
          expiresIn: config.get('jwt.expiresIn')
        }
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token de renovación expirado, inicie sesión nuevamente'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
  },

  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const decoded = jwt.decode(token);
        if (decoded?.id) {
          refreshTokens.delete(decoded.id);
        }
      }
      res.json({
        success: true,
        message: 'Sesión cerrada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al cerrar sesión'
      });
    }
  },

  async register(req, res) {
    try {
      const { username, email, password, rol = 'admin' } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos'
        });
      }

      const [existing] = await db.execute(
        'SELECT id FROM usuarios WHERE username = ? OR email = ?',
        [username, email]
      );

      if (existing.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'El usuario o email ya existe'
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const [result] = await db.execute(
        'INSERT INTO usuarios (username, email, password_hash, rol) VALUES (?, ?, ?, ?)',
        [username, email, passwordHash, rol]
      );

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          id: result.insertId,
          username,
          email,
          rol
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error en el servidor'
      });
    }
  },

  async getAll(req, res) {
    try {
      const [users] = await db.execute(
        'SELECT id, username, email, rol, esta_activo FROM usuarios ORDER BY id DESC'
      );
      
      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios'
      });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, rol, password, esta_activo } = req.body;

      const [existing] = await db.execute('SELECT id FROM usuarios WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const updates = [];
      const values = [];

      if (username) {
        updates.push('username = ?');
        values.push(username);
      }
      if (email) {
        updates.push('email = ?');
        values.push(email);
      }
      if (rol) {
        updates.push('rol = ?');
        values.push(rol);
      }
      if (typeof esta_activo === 'boolean') {
        updates.push('esta_activo = ?');
        values.push(esta_activo);
      }
      if (password) {
        const passwordHash = await bcrypt.hash(password, 10);
        updates.push('password_hash = ?');
        values.push(passwordHash);
      }

      if (updates.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No se enviaron campos para actualizar'
        });
      }

      values.push(id);
      await db.execute(`UPDATE usuarios SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`, values);

      const [rows] = await db.execute(
        'SELECT id, username, email, rol, esta_activo FROM usuarios WHERE id = ?',
        [id]
      );

      res.json({
        success: true,
        message: 'Usuario actualizado correctamente',
        data: rows[0]
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar usuario'
      });
    }
  },

  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;
      const { esta_activo } = req.body;

      if (typeof esta_activo !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'El estado esta_activo debe ser booleano'
        });
      }

      const [result] = await db.execute(
        'UPDATE usuarios SET esta_activo = ?, updated_at = NOW() WHERE id = ?',
        [esta_activo, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        message: `Usuario ${esta_activo ? 'activado' : 'desactivado'} correctamente`
      });
    } catch (error) {
      console.error('Error al cambiar estado de usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al cambiar estado del usuario'
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar usuario'
      });
    }
  }
};

module.exports = usuarioController;
