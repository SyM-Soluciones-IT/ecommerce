const db = require("../config/database");

const CartModel = {
  // Obtener todos los carritos
  async getCarts() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM carts");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener un carrito por su ID
  async getCartById(id) {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM carts WHERE id = ?", [id]);
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Crear un carrito nuevo
  async createCart(userId) {
    try {
      const pool = await db();
      const createdAt = new Date();
      const [result] = await pool.query(
        "INSERT INTO carts (user_id, created_at, updated_at) VALUES (?, ?, ?)",
        [userId, createdAt, createdAt]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Actualizar carrito (solo updated_at)
  async updateCart(id) {
    try {
      const pool = await db();
      const updatedAt = new Date();
      const [result] = await pool.query(
        "UPDATE carts SET updated_at = ? WHERE id = ?",
        [updatedAt, id]
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Eliminar carrito (eliminar por completo)
  async deleteCartById(id) {
    try {
      const pool = await db();
      const [result] = await pool.query("DELETE FROM carts WHERE id = ?", [id]);
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = CartModel;
