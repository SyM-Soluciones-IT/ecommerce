const db = require("../config/database");

const CartItemModel = {
  // Obtener todos los items de un carrito
  async getCartItems(cartId) {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM cart_items WHERE cart_id = ? AND visible = 1", [cartId]);
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener un item de carrito por su ID
  async getCartItemById(id) {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM cart_items WHERE id = ? AND visible = 1", [id]);
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Agregar un item a un carrito
  async addCartItem(cartId, productId, quantity, price) {
    try {
      const pool = await db();
      const createdAt = new Date();
      const [result] = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity, price, created_at) VALUES (?, ?, ?, ?, ?)",
        [cartId, productId, quantity, price, createdAt]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Actualizar un item de carrito
  async updateCartItem(id, quantity, price) {
    try {
      const pool = await db();
      const updatedAt = new Date();
      const [result] = await pool.query(
        "UPDATE cart_items SET quantity = ?, price = ?, updated_at = ? WHERE id = ? AND visible = 1",
        [quantity, price, updatedAt, id]
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Eliminar un item de carrito
  async deleteCartItem(id) {
    try {
      const pool = await db();
      const [result] = await pool.query("UPDATE cart_items SET visible = 0 WHERE id = ? AND visible = 1", [id]);
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = CartItemModel;