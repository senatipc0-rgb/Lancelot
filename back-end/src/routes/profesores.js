const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesorController');

router.get('/', profesorController.getAllProfesores);
router.get('/cursos-disponibles', profesorController.getCursosDisponibles);
router.get('/:id', profesorController.getProfesor);
router.post('/', profesorController.createProfesor);
router.put('/:id', profesorController.updateProfesor);
router.delete('/:id', profesorController.deleteProfesor);

module.exports = router;
