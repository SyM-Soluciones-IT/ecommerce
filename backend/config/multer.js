// multerConfig.js
const multer = require('multer');

// Configuración de almacenamiento
const storage = multer.memoryStorage(); // Almacena la imagen en memoria. Cambia a diskStorage si deseas almacenarla en el disco.

// Filtrar tipos de archivos
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error('Solo se permiten imágenes JPEG y PNG'), false); // Rechaza el archivo
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo de archivo 5 MB
  fileFilter: fileFilter,
});

module.exports = upload;
