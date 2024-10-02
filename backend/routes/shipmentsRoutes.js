const express = require("express");
const router = express.Router();
const shipmentsController = require("../controllers/ShipmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas para todos los usuarios 
router.get("/", shipmentsController.getShipments);
router.get("/:id", shipmentsController.getShipmentById);

// Rutas para usuarios administradores
router.post("/create", authMiddleware(true), shipmentsController.createShipment);
router.put("/:id", authMiddleware(true), shipmentsController.updateShipment);
router.delete("/:id", authMiddleware(true), shipmentsController.deleteShipmentById);

module.exports = router;