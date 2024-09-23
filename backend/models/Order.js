const db = require("../config/database");

const OrderModel = {
    // Obtener todas las órdenes
    async getOrders() {
        try {
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM orders WHERE visible = 1");
            return rows;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Obtener una orden por su ID
    async getOrderById(id) {
        try {
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM orders WHERE id = ? AND visible = 1", [id]);
            return rows[0];
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Agregar una nueva orden
    async createOrder(order) {
        try {
            const pool = await db();
            const createdAt = new Date(); // Fecha y hora de creación del registro
            const [result] = await pool.query(
                "INSERT INTO orders (user_id, total, status, shipping_address, payment_method, created_at, visible) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [order.user_id, order.total, order.status, order.shipping_address, order.payment_method, createdAt, 1]
            );
            return result.insertId;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Editar una orden
    async updateOrder(id, order) {
        try {
            const pool = await db();
            const [result] = await pool.query(
                "UPDATE orders SET total = ?, status = ?, shipping_address = ?, payment_method = ?, updated_at = ? WHERE id = ? AND visible = 1",
                [order.total, order.status, order.shipping_address, order.payment_method, new Date(), id]
            );
            return result;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Borrado lógico de una orden (visible = 0)
    async deleteOrderById(id) {
        try {
            const pool = await db();
            const [result] = await pool.query("UPDATE orders SET visible = 0 WHERE id = ? AND visible = 1", [id]);
            return result;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    }
};

module.exports = OrderModel;
