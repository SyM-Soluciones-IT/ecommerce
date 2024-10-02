const shipmentModel = require("../models/Shipment");

const getShipments = async (req, res) => {
    try {
        const shipments = await shipmentModel.getShipments();
        if (!shipments || shipments.length === 0) {
            return res.status(404).json({ message: "Envíos no encontrados" });
        }
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const getShipmentById = async (req, res) => {
    try {
        const shipment = await shipmentModel.getShipmentById(req.params.id);
        if (!shipment) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const createShipment = async (req, res) => {
    const {order_id, carrier, tracking_number, shipped_at, delivered_at} = req.body;
    try {
        if (!order_id || !carrier || !tracking_number || !shipped_at || !delivered_at) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const shipmentId = await shipmentModel.createShipment(order_id, carrier, tracking_number, shipped_at, delivered_at);
        res.status(201).json({ id: shipmentId, message: "Envío creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const updateShipment = async (req, res) => {
    const { id } = req.params;
    const {order_id, carrier, tracking_number, shipped_at, delivery_at} = req.body;
    try {
        if (!order_id || !carrier || !tracking_number || !shipped_at || !delivery_at) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const result = await shipmentModel.updateShipment(id, order_id, carrier, tracking_number, shipped_at, delivery_at);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Envío no encontrado o ya actualizado" });
        }
        res.json({ message: "Envío actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const deleteShipmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await shipmentModel.deleteShipmentById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Envío no encontrado o ya eliminado" });
        }
        res.json({ message: "Envío eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

module.exports = {
    getShipments,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipmentById,
}