// // backend/routes/setRoutes.js
// const express = require('express');
// const { db } = require('../models/Set');

// const router = express.Router();

// // Ruta para obtener todos los sets
// router.get('/', async (req, res) => {
//   try {
//     const [sets] = await db.query('SELECT * FROM sets');
//     res.json(sets);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // // Ruta para crear un nuevo set
// // router.post('/crear-set', async (req, res) => {
// //   const { cantidad } = req.body;

// //   // Verifica que se ha recibido la cantidad correctamente
// //   console.log('Cantidad recibida:', cantidad);  // Añade esta línea para depuración

// //   if (![3, 5, 7].includes(cantidad)) {
// //     return res.status(400).json({ message: 'Cantidad debe ser 3, 5 o 7.' });
// //   }

// //   try {
// //     const [result] = await db.query(
// //       'INSERT INTO sets (cantidad) VALUES (?)',
// //       [cantidad]
// //     );
// //     res.status(201).json({ id: result.insertId, cantidad });
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // });

// // Ruta para crear un nuevo set
// router.post('/crear-set', async (req, res) => {
//   const { result_1, result_2 } = req.body;

//   // Verifica que se ha recibido la cantidad correctamente
//   console.log('Resultado 1:', result_1);  // Añade esta línea para depuración
//   console.log('Resultado 2:', result_2);  // Añade esta línea para depuración

//   //Verifica que los resultados no sean indefinidos
//   if (result_1 === undefined || result_2 === undefined) {
//     return res.status(400).json({ message: 'Todos los resultados son obligatorios.' });
//   }

//   try {
//     const [result] = await db.query(
//       'INSERT INTO sets (result_1, result_2) VALUES (?, ?)',
//       [result_1, result_2]
//     );
//     res.status(201).json({ id: result.insertId, result_1, result_2 });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


// // Ruta para obtener un set por su ID
// router.get('/:id', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM sets WHERE id = ?', [req.params.id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Set no encontrado' });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // // Ruta para modificar un set por su ID
// // router.put('/modificar-set/:id', async (req, res) => {
// //   const { cantidad } = req.body;

// //   // Comprobar que la cantidad sea 3, 5 o 7
// //   if (![3, 5, 7].includes(cantidad)) {
// //     return res.status(400).json({ message: 'Cantidad debe ser 3, 5 o 7.' });
// //   }

// //   try {
// //     const [result] = await db.query('UPDATE sets SET cantidad = ? WHERE id = ?', [cantidad, req.params.id]);
// //     if (result.affectedRows === 0) {
// //       return res.status(404).json({ message: 'Set no encontrado' });
// //     }
// //     res.json({ message: 'Set actualizado correctamente' });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // Ruta para modificar un set por su ID
// router.put('/modificar-set/:id', async (req, res) => {
//   const { result_1, result_2 } = req.body;

//   // Verifica que se ha recibido la cantidad correctamente
//   console.log('Resultado 1:', result_1);  // Añade esta línea para depuración
//   console.log('Resultado 2:', result_2);  // Añade esta línea para depuración 

//   //Verifica que los resultados no sean indefinidos
//   if (result_1 === undefined || result_2 === undefined) {
//     return res.status(400).json({ message: 'Todos los resultados son obligatorios.' });
//   }

//   try {
//     const [result] = await db.query('UPDATE sets SET result_1 = ?, result_2 = ? WHERE id = ?', [result_1, result_2, req.params.id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Set no encontrado' });
//     }
//     res.json({ message: 'Set actualizado correctamente' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Ruta para eliminar un set por su ID
// router.delete('/eliminar-set/:id', async (req, res) => {
//   try {
//     const [result] = await db.query('DELETE FROM sets WHERE id = ?', [req.params.id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Set no encontrado' });
//     }
//     res.json({ message: 'Set eliminado correctamente' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const setController = require('../controllers/SetController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para cualquier usuario (solo autenticación)
router.get("/",  setController.getSets);
router.get("/:id", setController.getSetById);
router.get("/stats/:id", setController.getSetStats);

// Rutas para usuarios administradores (autenticación + admin)
router.post("/create", authMiddleware(true), setController.createSet);
router.put("/:id", authMiddleware(true), setController.updateSet);
router.delete("/:id", authMiddleware(true), setController.deleteSet);

module.exports = router;
