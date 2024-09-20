const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/CartController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas para todos los usuarios (solo autenticación)
router.get("/", cartsController.getCarts);
router.get("/:id", cartsController.getCartById);

// Rutas para usuarios administradores (autenticación + admin)
router.post("/create", authMiddleware(true), cartsController.createCart);
router.put("/:id", authMiddleware(true), cartsController.updateCart);
router.delete("/:id", authMiddleware(true), cartsController.deleteCartById);

module.exports = router;
