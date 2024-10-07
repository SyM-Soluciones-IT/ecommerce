const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET: Obtener todas las experiencias (incluyendo solo las visibles)
router.get('/get-experiences', async (req, res) => {
    const pool = await db();
    try {
        const experiences = await pool.query('SELECT * FROM experiences WHERE visible = 1');
        res.status(200).json(experiences[0]); // Asegúrate de que el formato sea correcto
    } catch (error) {
        console.error('Error al obtener experiencias:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

  

// POST: Agregar una nueva experiencia
router.post('/create-experience', async (req, res) => {
  const pool = await db();
  const { name, rating, comment } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO experiences (name, rating, comment, visible) VALUES (?, ?, ?, ?)', [name, rating, comment, true]);
    res.status(201).json({ id: result.insertId, name, rating, comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Actualizar una experiencia (puedes agregar el ID en el cuerpo o como parámetro de la ruta)
router.put('/update-experience/:id', async (req, res) => {
  const pool = await db();
  const { id } = req.params;
  const { name, rating, comment } = req.body;
  try {
    await pool.query('UPDATE experiences SET name = ?, rating = ?, comment = ? WHERE id = ?', [name, rating, comment, id]);
    res.status(200).json({ message: 'Experiencia actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar una experiencia (borrado lógico)
router.delete('/delete-experience/:id', async (req, res) => {
  const pool = await db();
  const { id } = req.params;
  try {
    await pool.query('UPDATE experiences SET visible = 0 WHERE id = ?', [id]);
    res.status(200).json({ message: 'Experiencia eliminada (borrado lógico)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
