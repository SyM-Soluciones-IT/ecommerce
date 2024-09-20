const db = require("../config/database");

const SetModel = {

  // Obtener sets
  async getSets() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM sets WHERE visible = 1");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener set por id
  async getSetById(id) {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM sets WHERE id = ? AND visible = 1", [id]);
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Crear set
  async createSet(result_1, result_2) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "INSERT INTO sets (result_1, result_2, visible) VALUES (?, ?, 1)",
        [result_1, result_2]
      );
      return result.insertId;
    } catch {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async updateSet(oldInfo, newInfo) {
    try {
      const pool = await db();
      const update = [
        newInfo.result_1 ? newInfo.result_1 : oldInfo.result_1,
        newInfo.result_2 ? newInfo.result_2 : oldInfo.result_2,
        oldInfo.id,
      ];
      const result = await pool.query(
        "UPDATE sets SET result_1 = ?, result_2 = ? WHERE id = ? AND visible = 1",
        update
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async deleteSet(id) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "UPDATE sets SET visible = 0 WHERE id = ? AND visible = 1",
        [id]
      );
      return result;
    } catch {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async getSetStats(id) {
    try {
      
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM resultados_intermedios where set_id = ? AND visible = 1 order by punto", [id]);
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

};

module.exports = SetModel;

