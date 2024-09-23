const express = require("express");
const router = express.Router();
const cartItemsController = require("../controllers/CartItemController");

// Rutas para todos los usuarios (solo autenticación)
router.get("/:cartId", cartItemsController.getCartItems);
router.get("/:cartId/:id", cartItemsController.getCartItemById);
router.post("/:cartId", cartItemsController.addCartItem);
router.put("/:cartId/:id", cartItemsController.updateCartItem);
router.delete("/:cartId/:id", cartItemsController.deleteCartItem);

module.exports = router;