const pool = require('../config/database');

exports.getAllCourses = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cursos ORDER BY nombre');
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cursos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const { nombre, codigo_curso, descripcion, creditos, grado, seccion, periodo, anno, max_estudiantes } = req.body;
    const [result] = await pool.query(
      'INSERT INTO cursos (nombre, codigo_curso, descripcion, creditos, grado, seccion, periodo, anno, max_estudiantes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, codigo_curso, descripcion, creditos, grado, seccion, periodo, anno, max_estudiantes]
    );
    res.status(201).json({ success: true, message: 'Curso creado', id: result.insertId });
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { nombre, descripcion, creditos, grado, seccion, periodo, anno, max_estudiantes, esta_activo } = req.body;
    const [result] = await pool.query(
      'UPDATE cursos SET nombre = ?, descripcion = ?, creditos = ?, grado = ?, seccion = ?, periodo = ?, anno = ?, max_estudiantes = ?, esta_activo = ? WHERE id = ?',
      [nombre, descripcion, creditos, grado, seccion, periodo, anno, max_estudiantes, esta_activo, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    }
    res.json({ success: true, message: 'Curso actualizado' });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM cursos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Curso no encontrado' });
    }
    res.json({ success: true, message: 'Curso eliminado' });
  } catch (error) {
    next(error);
  }
};