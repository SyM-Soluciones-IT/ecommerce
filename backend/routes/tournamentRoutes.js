// // backend/routes/tournamentRoutes.js
// const express = require("express");
// const { db } = require("../models/Tournament");

// const router = express.Router();

// // Ruta para obtener todos los torneos
// router.get("/", async (req, res) => {
//   try {
//     const [torneos] = await db.query("SELECT * FROM tournaments");
//     res.json(torneos);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// // Ruta para crear un nuevo torneo
// router.post("/crear-torneo", async (req, res) => {
//   const { nombre, fecha } = req.body;

//   // Comprobar que los campos no son undefined
//   if (nombre === undefined || fecha === undefined) {
//     return res
//       .status(400)
//       .json({ message: "El nombre y la fecha son obligatorios." });
//   }

//   try {
//     const [result] = await db.query(
//       "INSERT INTO tournaments (name, date) VALUES (?, ?)",
//       [nombre, fecha]
//     );
//     res.status(201).json({ id: result.insertId, nombre, fecha });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Ruta para obtener un torneo por su ID
// router.get("/:id", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM tournaments WHERE id = ?", [
//       req.params.id,
//     ]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Torneo no encontrado" });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Ruta para actualizar un torneo por su ID
// router.put("/modificar-torneo/:id", async (req, res) => {
//   const { nombre, fecha } = req.body;

//   // Comprobar que los campos no son undefined
//   if (nombre === undefined || fecha === undefined) {
//     return res
//       .status(400)
//       .json({ message: "El nombre y la fecha son obligatorios." });
//   }

//   try {
//     const [result] = await db.query(
//       "UPDATE tournaments SET name = ?, date = ? WHERE id = ?",
//       [nombre, fecha, req.params.id]
//     );
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Torneo no encontrado" });
//     }
//     res.json({ message: "Torneo actualizado correctamente" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Ruta para eliminar un torneo por su ID
// router.delete("/eliminar-torneo/:id", async (req, res) => {
//   try {
//     const [result] = await db.query("DELETE FROM tournaments WHERE id = ?", [
//       req.params.id,
//     ]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Torneo no encontrado" });
//     }
//     res.json({ message: "Torneo eliminado correctamente" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/TournamentController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas accesibles por cualquier usuario
router.get("/",  tournamentController.getTournaments);
router.get("/:id", tournamentController.getTournamentById);

// Rutas accesibles solo por administradores
router.post("/create",  authMiddleware(true), tournamentController.createTournament);
router.put("/:id", authMiddleware(true), tournamentController.updateTournament);
router.delete("/:id", authMiddleware(true), tournamentController.deleteTournamentById);

module.exports = router;