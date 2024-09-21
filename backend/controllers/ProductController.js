const ProductModel = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.getProducts();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  try {
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const result = await ProductModel.createProduct(name, description, price, stock, categoryId);
    res.status(201).json({ id: result, message: "Producto creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, categoryId } = req.body;
  try {
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const result = await ProductModel.updateProduct(id, name, description, price, stock, categoryId);
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProductModel.deleteProductById(id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};