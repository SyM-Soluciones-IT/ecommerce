const PaymentModel = require('../models/Payment');

// Obtener todos los pagos
const getPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.getPayments();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Obtener un pago por ID
const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await PaymentModel.getPaymentById(id);
        if (payment) {
            res.json(payment);
        } else {
            res.status(404).json({ message: "Pago no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Crear un nuevo pago
const createPayment = async (req, res) => {
    const { orderId, paymentMethod, paymentStatus, transactionId, amount } = req.body;
    try {
        if (!orderId || !paymentMethod || !paymentStatus || !transactionId || !amount) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const paymentId = await PaymentModel.createPayment(orderId, paymentMethod, paymentStatus, transactionId, amount);
        res.status(201).json({ id: paymentId, message: "Pago creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Editar un pago
const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus, transactionId } = req.body;
    try {
        if (!paymentStatus || !transactionId) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await PaymentModel.updatePayment(id, paymentStatus, transactionId);
        res.json({ message: "Pago actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Borrado lógico de un pago
const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        await PaymentModel.deletePaymentById(id);
        res.json({ message: "Pago eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

module.exports = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};
