// backend/routes/playerRoutes.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para todos los usuarios (solo autenticación)
router.get('/', playerController.getPlayers);
router.get('/:dni', playerController.getPlayer);

// Ruta para usuarios administradores (autenticación + admin)
router.put('/:dni', authMiddleware(true), playerController.updatePlayer);
router.delete('/:dni', authMiddleware(true), playerController.deletePlayer);
router.post('/create', authMiddleware(true), playerController.savePlayer);

module.exports = router;




/**const express = require('express');
const { db } = require('../models/Player');

const router = express.Router();

// Ruta para obtener todos los jugadores
router.get('/', async (req, res) => {
  try {
    const [jugadores] = await db.query('SELECT * FROM players');
    res.json(jugadores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un nuevo jugador
router.post('/crear-jugador', async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    nacimiento,
    email,
    telefono,
    categoria,
    comentario,
    provincia,
    ciudad,
    timestamp,
  } = req.body;

  // Comprobar que los campos no son undefined
  if (
    dni === undefined ||
    nombre === undefined ||
    apellido === undefined ||
    nacimiento === undefined ||
    email === undefined ||
    telefono === undefined ||
    categoria === undefined ||
    comentario === undefined ||
    provincia === undefined ||
    ciudad === undefined ||
    timestamp === undefined
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO jugadores (dni, name, surname, birthdate, email, phone, category, province, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [dni, nombre, apellido, nacimiento, email, telefono, categoria, comentario, provincia, ciudad, timestamp]
    );
    res.status(201).json({ id: result.insertId, dni, nombre, apellido, nacimiento, email, telefono, categoria, provincia, ciudad });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para obtener un jugador por su ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM players WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar un jugador por su ID
router.put('/modificar-jugador/:id', async (req, res) => {
  const {
    dni,
    nombre,
    apellido,
    nacimiento,
    email,
    telefono,
    categoria,
    comentario,
    provincia,
    ciudad,
    timestamp,
  } = req.body;

  // Comprobar que los campos no son undefined
  if (
    dni === undefined ||
    nombre === undefined ||
    apellido === undefined ||
    nacimiento === undefined ||
    email === undefined ||
    telefono === undefined ||
    categoria === undefined ||
    comentario === undefined ||
    provincia === undefined ||
    ciudad === undefined ||
    timestamp === undefined
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE players SET dni = ?, name = ?, surname = ?, birthdate = ?, email = ?, phone = ?, category = ?, province = ?, city = ? WHERE id = ?',
      [dni, nombre, apellido, nacimiento, email, telefono, categoria, provincia, ciudad, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json({ message: 'Jugador actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para eliminar un jugador por su ID
router.delete('/eliminar-jugador/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM players WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json({ message: 'Jugador eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
*/