const CartModel = require("../models/Cart");
const CartItemModel = require("../models/CartItem");

const getCarts = async (req, res) => {
  try {
    const carts = await CartModel.getCarts();
    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "No se encontraron carritos" });
    }
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.getCartById(id);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getCartItems = async (req, res) => {
  const { id } = req.params;
  try {
    const items = await CartItemModel.getCartItems(id);
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No se encontraron items en el carrito" });
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const addItemToCart = async (req, res) => {
  const { cartId, productId, quantity, price } = req.body;
  try {
    const result = await CartItemModel.addItemToCart(cartId, productId, quantity, price);
    res.status(201).json({ id: result, message: "Item agregado al carrito correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updateCartItem = async (req, res) => {
  const { cartId, itemId, quantity, price } = req.body;
  try {
    const result = await CartItemModel.updateCartItem(cartId, itemId, quantity, price);
    res.json({ message: "Item actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const deleteCartItem = async (req, res) => {
  const { cartId, itemId } = req.params;
  try {
    const result = await CartItemModel.deleteCartItem(cartId, itemId);
    res.json({ message: "Item eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const createCart = async (req, res) => {
  const { user_id } = req.body;
  try {
    if (!user_id) {
      return res.status(400).json({ message: "El user_id es obligatorio" });
    }
    const result = await CartModel.createCart(user_id);
    res.status(201).json({ id: result, user_id });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CartModel.updateCart(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.json({ message: "Carrito actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const deleteCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CartModel.deleteCartById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = {
  getCarts,
  getCartById,
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  createCart,
  updateCart,
  deleteCartById,
};