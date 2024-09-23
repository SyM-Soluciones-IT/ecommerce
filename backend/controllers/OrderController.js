const OrderModel = require('../models/Order');

// Obtener todas las órdenes
const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Obtener una orden por ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await OrderModel.getOrderById(id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Orden no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Crear una nueva orden
const createOrder = async (req, res) => {
    const { user_id, total, status, shipping_address, payment_method } = req.body;
    try {
        if (!user_id || !total || !status || !shipping_address || !payment_method) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const orderId = await OrderModel.createOrder({ user_id, total, status, shipping_address, payment_method });
        res.status(201).json({ id: orderId, message: "Orden creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Editar una orden
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { total, status, shipping_address, payment_method } = req.body;
    try {
        if (!total || !status || !shipping_address || !payment_method) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await OrderModel.updateOrder(id, { total, status, shipping_address, payment_method });
        res.json({ message: "Orden actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

// Borrado lógico de una orden
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await OrderModel.deleteOrderById(id);
        res.json({ message: "Orden eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
