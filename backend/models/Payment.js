const db = require("../config/database");

const PaymentModel = {
    // Obtener todos los pagos
    async getPayments() {
        try {
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM payments WHERE visible = 1");
            return rows;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Obtener un pago por su ID
    async getPaymentById(id) {
        try {
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM payments WHERE id = ? AND visible = 1", [id]);
            return rows[0];
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Editar un pago
    async updatePayment(id, paymentStatus, transactionId) {
        try {
            const pool = await db();
            const [result] = await pool.query(
                "UPDATE payments SET payment_status = ?, transaction_id = ?, updated_at = ? WHERE id = ? AND visible = 1",
                [paymentStatus, transactionId, new Date(), id]
            );
            return result;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Agregar un nuevo pago
    async createPayment(orderId, paymentMethod, paymentStatus, transactionId, amount) {
        try {
            const pool = await db();
            const createdAt = new Date(); // Fecha y hora de creación del registro
            const [result] = await pool.query(
                "INSERT INTO payments (order_id, payment_method, payment_status, transaction_id, amount, paid_at, created_at, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [orderId, paymentMethod, paymentStatus, transactionId, amount, createdAt, createdAt, 1]
            );
            return result.insertId;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    },

    // Borrado lógico de un pago (visible = 0)
    async deletePaymentById(id) {
        try {
            const pool = await db();
            const [result] = await pool.query("UPDATE payments SET visible = 0 WHERE id = ? AND visible = 1", [id]);
            return result;
        } catch (err) {
            console.error("Error ejecutando la consulta:", err);
            throw err;
        }
    }
};

module.exports = PaymentModel;
