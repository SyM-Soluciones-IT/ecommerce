const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas accesibles por cualquier usuario (solo autenticación)
router.get('/:id', categoryController.getCategoryById);
router.get('/', categoryController.getCategories);
// Rutas accesibles por administradores (autenticación + admin)
router.put('/:id', authMiddleware(true), categoryController.updateCategory);
router.delete('/:id', authMiddleware(true), categoryController.deleteCategoryById);
router.post('/save', authMiddleware(true), categoryController.saveCategory);

module.exports = router;

