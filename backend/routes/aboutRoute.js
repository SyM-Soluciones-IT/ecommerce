const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Asegúrate de que la ruta sea correcta
const upload = require('../config/multer');

// Consultas SQL como constantes
const UPDATE_ABOUT_QUERY = 'UPDATE about SET description1 = ?, description2 = ?, description3 = ?, image = ? WHERE id = ?';
const SELECT_ABOUT_QUERY = 'SELECT * FROM about WHERE id = ?';

// Ruta para actualizar la información de About
router.put('/update-about', upload.single('image'), async (req, res) => {
    const pool = await db();
    try {
        const { description1, description2, description3, id, image } = req.body; // Obtén el ID del cuerpo de la solicitud
        // const image = req.image ? req.image.buffer : null; // Obtén el buffer de la imagen

        // Validación de entrada
        if (!description1 || !description2 || !description3 || !id) {
            return res.status(400).json({ success: false, message: 'Faltan campos requeridos.' });
        }

        console.log(image);

        // Actualiza los datos en la base de datos
        const [results] = await pool.query(UPDATE_ABOUT_QUERY, [description1, description2, description3, image, id]);

        console.log(results);
        
        // Chequea cuántas filas se han afectado
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró información para actualizar con el ID proporcionado.' });
        }

        return res.json({ success: true, message: 'Información actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la información:', error);
        return res.status(500).json({ success: false, message: 'Error al actualizar la información', error: error.message });
    }
});

// Ruta para obtener la información de About
router.get('/get-about', async (req, res) => {
    const pool = await db(); 
    try {
        const [results] = await pool.query(SELECT_ABOUT_QUERY, [1]);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró información' });
        }

        // Convertir la imagen de Buffer a Base64
        if (results[0].image) {
            results[0].image = results[0].image.toString('base64'); // Asegúrate de que esto esté funcionando
        }

        return res.json({ success: true, data: results[0] });
    } catch (error) {
        console.error('Error en la ruta About:', error);
        return res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
    }
});

module.exports = router;
