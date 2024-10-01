const db = require("../config/database");

const ProductModel = {
  // Obtener todos los productos
  async getProducts() {
    try {
      const pool = await db();
      const [rows] = await pool.query(`
        SELECT p.id, p.name, p.description, p.price, pi.image 
        FROM products p 
        JOIN product_images pi ON p.id = pi.product_id 
        WHERE pi.visible = 1;
      `);

      // Convertir el BLOB a base64
      const productsWithImages = rows.map((product) => ({
        ...product,
        image: product.image ? product.image.toString('base64') : null, // Convertir el BLOB a base64
      }));

      return productsWithImages;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener un producto por su ID
  async getProductById(id) {
    try {
      const pool = await db();
      const [productRows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
      const product = productRows[0];
      
      if (!product) return null; // Si no se encuentra el producto, devolver null
      
      return product;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Crear un producto nuevo
  async createProduct(name, description, price, stock, categoryId) {
    try {
      const pool = await db();
      const createdAt = new Date();
      const [result] = await pool.query(
        "INSERT INTO products (name, description, price, stock, category_id, created_at, visible) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, description, price, stock, categoryId, createdAt, 1]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Actualizar un producto
  async updateProduct(id, name, description, price, stock, categoryId) {
    try {
      const pool = await db();
      const updatedAt = new Date();
      const [result] = await pool.query(
        "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, updated_at = ? WHERE id = ?",
        [name, description, price, stock, categoryId, updatedAt, id]
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Eliminar un producto
  async deleteProductById(id) {
    try {
      const pool = await db();
      const [result] = await pool.query("UPDATE products SET visible = 0 WHERE id = ?", [id]);
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = ProductModel;