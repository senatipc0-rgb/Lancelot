const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

      const validPassword = bcrypt.compareSync(password, passwordRows[0].password_hash);
      
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, rol: user.rol },
        process.env.JWT_SECRET || 'secreto_temporal',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          token,
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

  async register(req, res) {
    try {
      const { username, email, password, rol = 'staff' } = req.body;
      
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
        return res.status(400).json({
          success: false,
          message: 'El usuario o email ya existe'
        });
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const [result] = await db.execute(
        'INSERT INTO usuarios (username, email, password_hash, rol) VALUES (?, ?, ?, ?)',
        [username, email, passwordHash, rol]
      );

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: { id: result.insertId }
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
      const [usuarios] = await db.execute(
        'SELECT id, username, email, rol, esta_activo, created_at FROM usuarios ORDER BY created_at DESC'
      );
      
      res.json({
        success: true,
        data: usuarios
      });
    } catch (error) {
      console.error('Error listando usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error en el servidor'
      });
    }
  }
};

module.exports = usuarioController;