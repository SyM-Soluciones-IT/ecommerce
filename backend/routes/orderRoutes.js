const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para todos los usuarios 
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

// Rutas para usuarios administradores
router.post('/create', authMiddleware(true), orderController.createOrder);
router.put('/:id', authMiddleware(true), orderController.updateOrder);
router.delete('/:id', authMiddleware(true), orderController.deleteOrder);

module.exports = router;
