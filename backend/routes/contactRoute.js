const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Consultas SQL como constantes
const UPDATE_CONTACT_QUERY = 'UPDATE contact SET instagram1 = ?, instagram2 = ?, google_map_url = ? WHERE id = ?';
const SELECT_CONTACT_QUERY = 'SELECT * FROM contact WHERE id = ?';

// Ruta para actualizar la información de contacto
router.put('/update-contact', async (req, res) => {
    const pool = await db();
    try {
        const { instagram1, instagram2, google_map_url, id } = req.body;

        // Validación de entrada
        if (!instagram1 || !instagram2 || !google_map_url || !id) {
            return res.status(400).json({ success: false, message: 'Faltan campos requeridos.' });
        }

        // Actualizar los datos en la base de datos
        const [results] = await pool.query(UPDATE_CONTACT_QUERY, [instagram1, instagram2, google_map_url, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró información para actualizar con el ID proporcionado.' });
        }

        return res.json({ success: true, message: 'Información de contacto actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la información de contacto:', error);
        return res.status(500).json({ success: false, message: 'Error al actualizar la información', error: error.message });
    }
});

// Ruta para obtener la información de contacto
router.get('/get-contact', async (req, res) => {
    const pool = await db();
    try {
        const [results] = await pool.query(SELECT_CONTACT_QUERY, [1]); // Suponiendo que el ID es 1

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró información de contacto' });
        }

        return res.json({ success: true, data: results[0] });
    } catch (error) {
        console.error('Error en la ruta de Contact:', error);
        return res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
    }
});

module.exports = router;
