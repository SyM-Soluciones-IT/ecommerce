// // backend/routes/refereeRoutes.js
// const express = require('express');
// const router = express.Router();
// const Referee = require('../models/Referees');

// // Ruta para obtener todos los árbitros
// router.get('/arbitros', async (req, res) => {
//     try {
//         const referees = await Referee.find();
//         res.json(referees);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Ruta para obtener un árbitro por su ID
// router.get('/arbitros/:id', async (req, res) => {
//     try {
//         const referee = await Referee.findById(req.params.id);
//         if (!referee) return res.status(404).json({ message: 'Árbitro no encontrado' });
//         res.json(referee);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Ruta para crear un nuevo árbitro
// router.post('/crear-arbitro', async (req, res) => {
//     const { name, surname, email, phone, experience, certifications, city, province, country } = req.body;
//     const newReferee = new Referee({
//         name,
//         surname,
//         email,
//         phone,
//         experience,
//         certifications,
//         city,
//         province,
//         country
//     });

//     try {
//         const referee = await newReferee.save();
//         res.status(201).json(referee);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Ruta para actualizar un árbitro por su ID
// router.put('/editar-arbitro/:id', async (req, res) => {
//     try {
//         const referee = await Referee.findById(req.params.id);
//         if (!referee) return res.status(404).json({ message: 'Árbitro no encontrado' });

//         // Actualiza los campos
//         if (req.body.name) referee.name = req.body.name;
//         if (req.body.surname) referee.surname = req.body.surname;
//         if (req.body.email) referee.email = req.body.email;
//         if (req.body.phone) referee.phone = req.body.phone;
//         if (req.body.experience) referee.experience = req.body.experience;
//         if (req.body.certifications) referee.certifications = req.body.certifications;
//         if (req.body.city) referee.city = req.body.city;
//         if (req.body.province) referee.province = req.body.province;
//         if (req.body.country) referee.country = req.body.country;

//         const updatedReferee = await referee.save();
//         res.json(updatedReferee);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Ruta para eliminar un árbitro por su ID
// router.delete('/eliminar-arbitro/:id', async (req, res) => {
//     try {
//         const referee = await Referee.findByIdAndDelete(req.params.id);
//         if (!referee) return res.status(404).json({ message: 'Árbitro no encontrado' });

//         res.json({ message: 'Árbitro eliminado' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// module.exports = router;
