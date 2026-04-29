const pool = require('../config/database');

exports.getAllProfesores = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre as curso_nombre, c.codigo_curso as curso_codigo 
       FROM profesores p 
       LEFT JOIN cursos c ON p.curso_id = c.id 
       ORDER BY p.apellido, p.nombre`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getProfesor = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre as curso_nombre, c.codigo_curso as curso_codigo 
       FROM profesores p 
       LEFT JOIN cursos c ON p.curso_id = c.id 
       WHERE p.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Profesor no encontrado' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.createProfesor = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono, departamento, curso_id, esta_activo = true } = req.body;
    
    if (!nombre || !apellido || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nombre, apellido y email son requeridos' 
      });
    }

    // Check if email already exists
    const [existing] = await pool.query(
      'SELECT id FROM profesores WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'El email ya está registrado' 
      });
    }

    // If curso_id is provided and not null, verify the course exists and is active
    if (curso_id !== undefined && curso_id !== null) {
      const [cursoRows] = await pool.query(
        'SELECT id FROM cursos WHERE id = ? AND esta_activo = TRUE',
        [curso_id]
      );
      if (cursoRows.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'El curso asignado no existe o no está activo' 
        });
      }
    }

    const [result] = await pool.query(
      'INSERT INTO profesores (nombre, apellido, email, telefono, departamento, curso_id, esta_activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, telefono, departamento, curso_id, esta_activo]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Profesor creado exitosamente', 
      id: result.insertId 
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfesor = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono, departamento, curso_id, esta_activo } = req.body;
    const { id } = req.params;

    // Verify profesor exists
    const [existingProfesor] = await pool.query(
      'SELECT id FROM profesores WHERE id = ?',
      [id]
    );
    
    if (existingProfesor.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profesor no encontrado' 
      });
    }

    // Check if email is being changed and already exists
    if (email) {
      const [emailRows] = await pool.query(
        'SELECT id FROM profesores WHERE email = ? AND id != ?',
        [email, id]
      );
      
      if (emailRows.length > 0) {
        return res.status(409).json({ 
          success: false, 
          message: 'El email ya está registrado para otro profesor' 
        });
      }
    }

    // If curso_id is provided and not null, verify the course exists and is active
    if (curso_id !== undefined && curso_id !== null) {
      const [cursoRows] = await pool.query(
        'SELECT id FROM cursos WHERE id = ? AND esta_activo = TRUE',
        [curso_id]
      );
      if (cursoRows.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'El curso asignado no existe o no está activo' 
        });
      }
    }

    // Build dynamic update query
    const updates = [];
    const values = [];

    if (nombre !== undefined) {
      updates.push('nombre = ?');
      values.push(nombre);
    }
    if (apellido !== undefined) {
      updates.push('apellido = ?');
      values.push(apellido);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      values.push(email);
    }
    if (telefono !== undefined) {
      updates.push('telefono = ?');
      values.push(telefono);
    }
    if (departamento !== undefined) {
      updates.push('departamento = ?');
      values.push(departamento);
    }
    if (curso_id !== undefined) {
      updates.push('curso_id = ?');
      values.push(curso_id);
    }
    if (typeof esta_activo === 'boolean') {
      updates.push('esta_activo = ?');
      values.push(esta_activo);
    }

    if (updates.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No se enviaron campos para actualizar' 
      });
    }

    values.push(id);
    await pool.query(
      `UPDATE profesores SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // Get updated profesor with course info
    const [updatedRows] = await pool.query(
      `SELECT p.*, c.nombre as curso_nombre, c.codigo_curso as curso_codigo 
       FROM profesores p 
       LEFT JOIN cursos c ON p.curso_id = c.id 
       WHERE p.id = ?`,
      [id]
    );

    res.json({ 
      success: true, 
      message: 'Profesor actualizado correctamente',
      data: updatedRows[0]
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfesor = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM profesores WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profesor no encontrado' 
      });
    }

    res.json({ success: true, message: 'Profesor eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

exports.getCursosDisponibles = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, codigo_curso FROM cursos WHERE esta_activo = TRUE ORDER BY nombre'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};