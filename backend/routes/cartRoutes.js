const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/CartController");

// Rutas para todos los usuarios (solo autenticación)
router.get("/", cartsController.getCarts);
router.get("/:id", cartsController.getCartById);
router.get("/:id/items", cartsController.getCartItems);
router.post("/create", cartsController.createCart);
router.put("/:id", cartsController.updateCart);
router.delete("/:id", cartsController.deleteCartById);
router.post("/:id/items", cartsController.addItemToCart);
router.put("/:id/items/:itemId", cartsController.updateCartItem);
router.delete("/:id/items/:itemId", cartsController.deleteCartItem);

module.exports = router;