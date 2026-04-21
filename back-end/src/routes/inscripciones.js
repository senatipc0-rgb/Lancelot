const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/inscripcionController');

router.get('/', inscripcionController.getAllInscripciones);
router.get('/estudiante/:estudianteId', inscripcionController.getInscripcionesByEstudiante);
router.get('/curso/:cursoId', inscripcionController.getInscripcionesByCurso);
router.post('/', inscripcionController.createInscripcion);
router.put('/:id', inscripcionController.updateInscripcion);
router.delete('/:id', inscripcionController.deleteInscripcion);

module.exports = router;