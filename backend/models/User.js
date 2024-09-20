const db = require("../config/database");

const UserModel = {
  async getUserById(id) {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ? AND visible = 1", [id]);
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async getUsers() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM users WHERE visible = 1");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async createUser(userInfo) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password, role, secret_key, refreshToken, visible) VALUES (?, ?, ?, ?, ?, ?, 1)",
        [userInfo.name, userInfo.email, userInfo.password, userInfo.role, userInfo.secret_key, userInfo.refreshToken]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async updateUser(id, userInfo) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "UPDATE users SET name = ?, email = ?, password = ?, role = ?, secret_key = ?, refreshToken = ? WHERE id = ? AND visible = 1",
        [userInfo.name, userInfo.email, userInfo.password, userInfo.role, userInfo.secret_key, userInfo.refreshToken, id]
      );
      return result.affectedRows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
  async deleteUser(id) {
    try {
      const pool = await db();
      const [result] = await pool.query("UPDATE users SET visible = 0 WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = UserModel;
