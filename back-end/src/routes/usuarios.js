const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.post('/refresh', usuarioController.refreshToken);
router.post('/logout', usuarioController.logout);
router.get('/', usuarioController.getAll);
router.put('/:id', usuarioController.updateUser);
router.patch('/:id/status', usuarioController.toggleUserStatus);
router.delete('/:id', usuarioController.deleteUser);

module.exports = router;
