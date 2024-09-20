const express = require("express");
const router = express.Router();
const { register, login, logout, refresh } = require("../controllers/authControllers");

// Ruta para registrar usuarios
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para cerrar sesión
router.post("/logout", logout);

// Ruta para refrescar el token
router.post("/refresh", refresh);

module.exports = router;
