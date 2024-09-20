const CategoryModel = require("../models/Category");

const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.getCategoryById(req.params.id);
    if (!category || category.length === 0) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getCategories();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "Categorías no encontradas" });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const saveCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre de la categoría es obligatorio." });
    } 
    const result = CategoryModel.createCategory(name, description || null);
    res.status(201).json({ id: result.insertId, name: name, description: description || null });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre de la categoría es obligatorio." });
    }

    // Llama al modelo, pasando la descripción solo si está presente.
    const result = await CategoryModel.updateCategory(id, name, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o no visible" });
    }
    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};


const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CategoryModel.deleteCategoryById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o ya eliminada" });
    }
    res.json({ message: "Categoría eliminada lógicamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = { getCategoryById, getCategories, saveCategory, updateCategory, deleteCategoryById };

/*
const express = require('express');
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
