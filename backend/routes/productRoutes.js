const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas para todos los usuarios (solo autenticación)
router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);

// Rutas para usuarios administradores (autenticación + admin)
router.post("/create", authMiddleware(true), productsController.createProduct);
router.put("/:id", authMiddleware(true), productsController.updateProduct);
router.delete("/:id", authMiddleware(true), productsController.deleteProductById);

module.exports = router;