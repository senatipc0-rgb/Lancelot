const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.getAllCourses);
router.get('/:id', cursoController.getCourse);
router.post('/', cursoController.createCourse);
router.put('/:id', cursoController.updateCourse);
router.delete('/:id', cursoController.deleteCourse);

module.exports = router;