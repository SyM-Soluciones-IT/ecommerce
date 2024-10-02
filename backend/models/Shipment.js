const db = require("../config/database");

const ShipmentModel = {
    // Obtener todos los envíos
    async getShipments() {
        try {
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM shipments WHERE visible = 1");
            return rows;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Obtener un envío por su ID
    async getShipmentById(id) {
        try {
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM shipments WHERE id = ? AND visible = 1", [id]);
            return rows[0];
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Crear un nuevo envío
    async createShipment(order_id, carrier, tracking_number, shipped_at, delivered_at) {
        try {
            const pool = await db();
            const created_at = new Date();
            const [result] = await pool.query(
                "INSERT INTO shipments (order_id, carrier, tracking_number, shipped_at, delivered_at, created_at, visible ) VALUES (?, ?, ?, ?, ?, ? , ?)",
                [order_id, carrier, tracking_number, shipped_at, delivered_at, created_at, 1]
            );
            return result.insertId;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Actualizar un envío
    async updateShipment(id, order_id, carrier, tracking_number, shipped_at, delivery_at) {
        try {
            const pool = await db();
            const [result] = await pool.query(
                "UPDATE shipments SET order_id = ?, carrier = ?, tracking_number = ?, shipped_at = ?, delivery_at = ? WHERE id = ?",
                [order_id, carrier, tracking_number, shipped_at, delivery_at, updatedAt, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }   
    },

    // Eliminar un envío
    async deleteShipmentById(id) {
        try {
            const pool = await db();
            const [result] = await pool.query("UPDATE shipments SET visible = 0 WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    }

}

module.exports = ShipmentModel