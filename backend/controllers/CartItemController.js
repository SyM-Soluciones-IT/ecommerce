const CartItemModel = require("../models/CartItem");

const getCartItems = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cartItems = await CartItemModel.getCartItems(cartId);
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getCartItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartItemModel.getCartItemById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Item de carrito no encontrado" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const addCartItem = async (req, res) => {
  const { cartId, productId, quantity, price } = req.body;
  try {
    if (!cartId || !productId || !quantity || !price) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const result = await CartItemModel.addCartItem(cartId, productId, quantity, price);
    res.status(201).json({ id: result, cartId, productId, quantity, price });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  try {
    if (!quantity || !price) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const result = await CartItemModel.updateCartItem(id, quantity, price);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item de carrito no encontrado" });
    }
    res.json({ message: "Item de carrito actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CartItemModel.deleteCartItem(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item de carrito no encontrado" });
    }
    res.json({ message: "Item de carrito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = {
  getCartItems,
  getCartItemById,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};