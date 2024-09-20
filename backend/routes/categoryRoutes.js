// backend/routes/categoryRoutes.js
/*const express = require('express');
const { db } = require('../models/Category');

const router = express.Router();

// Ruta para obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [categorias] = await db.query('SELECT * FROM categories');
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear una nueva categoría
router.post('/crear-categoria', async (req, res) => {
  const { nombre } = req.body;

  // Comprobar que el campo no es undefined
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [nombre]
    );
    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para obtener una categoría por su ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar una categoría por su ID
router.put('/modificar-categoria/:id', async (req, res) => {
  const { nombre } = req.body;

  // Comprobar que el campo no es undefined
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [nombre, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para eliminar una categoría por su ID
router.delete('/eliminar-categoria/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;*/

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

