const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para todos los usuarios
router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPaymentById);

// Rutas para usuarios administradores
router.post('/create', authMiddleware(true), paymentController.createPayment);
router.put('/:id' , authMiddleware(true), paymentController.updatePayment);
router.delete('/:id', authMiddleware(true), paymentController.deletePayment);

module.exports = router;
