const db = require("../config/database");

const CartModel = {
  // Obtener todos los carritos
  async getCarts() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM carts WHERE visible = 1");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener un carrito por su ID, incluyendo sus items
  async getCartById(id) {
    try {
      const pool = await db();

      // Consulta para obtener el carrito
      const [cartRows] = await pool.query("SELECT * FROM carts WHERE id = ? AND visible = 1", [id]);
      const cart = cartRows[0];
      
      if (!cart) return null; // Si no se encuentra el carrito, devolver null
      
      // Consulta para obtener los items asociados al carrito
      const [itemsRows] = await pool.query("SELECT * FROM cart_items WHERE cart_id = ? AND visible = 1", [id]);

      // Agregar los items al objeto carrito
      cart.items = itemsRows;
      
      return cart;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener los items de un carrito sin incluir el carrito mismo
  async getCartItems(cartId) {
    try {
      const pool = await db();
      const [itemsRows] = await pool.query("SELECT * FROM cart_items WHERE cart_id = ? AND visible = 1", [cartId]);
      return itemsRows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Agregar un item a un carrito
  async addItemToCart(cartId, productId, quantity, price) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [cartId, productId, quantity, price]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Actualizar un item de un carrito
  async updateCartItem(cartId, itemId, quantity, price) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "UPDATE cart_items SET quantity = ?, price = ? WHERE cart_id = ? AND id = ? AND visible = 1",
        [quantity, price, cartId, itemId]
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Eliminar un item de un carrito
  async deleteCartItem(cartId, itemId) {
    try {
      const pool = await db();
      const [result] = await pool.query("UPDATE cart_items SET visible = 0 WHERE cart_id = ? AND id = ? AND visible = 1", [cartId, itemId]);
      return result;
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
        "UPDATE carts SET updated_at = ? WHERE id = ? AND visible = 1",
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

      // Primero eliminar los items del carrito
      await pool.query("UPDATE cart_items SET visible = 0 WHERE cart_id = ?", [id]);

      const [result] = await pool.query("UPDATE carts SET visible = 0 WHERE id = ?", [id]);
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = CartModel;