const CategoryModel = require("../models/Category");

const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.getCategoryById(req.params.id);
    if (!category || category.length === 0) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getCategories();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "Categorías no encontradas" });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre de la categoría es obligatorio." });
    } 
    const result = CategoryModel.createCategory(name, description || null);
    res.status(201).json({ id: result.insertId, name: name, description: description || null });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre de la categoría es obligatorio." });
    }

    // Llama al modelo, pasando la descripción solo si está presente.
    const result = await CategoryModel.updateCategory(id, name, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o no visible" });
    }
    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};


const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CategoryModel.deleteCategoryById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o ya eliminada" });
    }
    res.json({ message: "Categoría eliminada lógicamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = { getCategoryById, getCategories, createCategory, updateCategory, deleteCategoryById };