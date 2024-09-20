const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

// Rutas protegidas para administradores
router.post('/create', authMiddleware(true), userController.createUser);
router.put('/:id', authMiddleware(true), userController.updateUser);
router.delete('/:id', authMiddleware(true), userController.deleteUser);

module.exports = router;
