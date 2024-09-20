const db = require("../config/database");

const CategoryModel = {
  // Obtener categoría por ID si está visible
  async getCategoryById(id) {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM categories WHERE id = ? AND visible = 1", [id]);
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener todas las categorías visibles
  async getCategories() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM categories WHERE visible = 1");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Crear una nueva categoría con visible = 1
  async createCategory(name, description) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "INSERT INTO categories (name, description, created_at, visible) VALUES (?, ?, NOW(), 1)",
        [name, description]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Actualizar una categoría solo si está visible
  async updateCategory(id, name, description) {
    try {
      const pool = await db();
  
      // Si no se proporciona una descripción, no se actualiza.
      let query = "UPDATE categories SET name = ?";
      let params = [name, id];
  
      if (description) {
        query += ", description = ?";
        params = [name, description, id];
      }
  
      query += " WHERE id = ? AND visible = 1";
  
      const [result] = await pool.query(query, params);
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
  

  // Borrado lógico de una categoría (visible = 0)
  async deleteCategoryById(id) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "UPDATE categories SET visible = 0 WHERE id = ? AND visible = 1",
        [id]
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = CategoryModel;
