const pool = require('../config/database');

exports.getAllInscripciones = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, e.nombres, e.apellidos, e.codigo_estudiante, c.nombre as curso_nombre, c.codigo_curso
      FROM inscripciones i
      JOIN estudiantes e ON i.estudiante_id = e.id
      JOIN cursos c ON i.curso_id = c.id
      ORDER BY i.fecha_inscripcion DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getInscripcionesByEstudiante = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, c.nombre as curso_nombre, c.codigo_curso
      FROM inscripciones i
      JOIN cursos c ON i.curso_id = c.id
      WHERE i.estudiante_id = ?
      ORDER BY i.fecha_inscripcion DESC
    `, [req.params.estudianteId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getInscripcionesByCurso = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, e.nombres, e.apellidos, e.codigo_estudiante
      FROM inscripciones i
      JOIN estudiantes e ON i.estudiante_id = e.id
      WHERE i.curso_id = ?
    `, [req.params.cursoId]);
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

exports.createInscripcion = async (req, res, next) => {
  try {
    const { estudiante_id, curso_id, estado, nota_final } = req.body;
    const fecha_inscripcion = new Date().toISOString().split('T')[0];
    
    const [result] = await pool.query(
      'INSERT INTO inscripciones (estudiante_id, curso_id, fecha_inscripcion, estado, nota_final) VALUES (?, ?, ?, ?, ?)',
      [estudiante_id, curso_id, fecha_inscripcion, estado || 'inscrito', nota_final]
    );
    res.status(201).json({ success: true, message: 'Inscripción creada', id: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'El estudiante ya está inscrito en este curso' });
    }
    next(error);
  }
};

exports.updateInscripcion = async (req, res, next) => {
  try {
    const { estado, nota_final } = req.body;
    const [result] = await pool.query(
      'UPDATE inscripciones SET estado = ?, nota_final = ? WHERE id = ?',
      [estado, nota_final, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Inscripción no encontrada' });
    }
    res.json({ success: true, message: 'Inscripción actualizada' });
  } catch (error) {
    next(error);
  }
};

exports.deleteInscripcion = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM inscripciones WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Inscripción no encontrada' });
    }
    res.json({ success: true, message: 'Inscripción eliminada' });
  } catch (error) {
    next(error);
  }
};