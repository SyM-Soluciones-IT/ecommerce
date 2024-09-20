const db = require("../config/database");

const TournamentModel = {
  // Obtener torneo por id
  async getTournamentById(id) {
    try {
      const pool = await db();
      const [rows] = await pool.query(
        "SELECT * FROM tournaments WHERE id = ? AND visible = 1",
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Obtener torneos
  async getTournaments() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM tournaments WHERE visible = 1");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Crear torneo
  async createTournament(name, date) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "INSERT INTO tournaments (name, date, visible) VALUES (?, ?, 1)",
        [name, date]
      );
      return result.insertId;
    } catch {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Actualizar torneo
  async updateTournament(oldInfo, newInfo) {
    try {
      const pool = await db();
      const update = [
        newInfo.name ? newInfo.name : oldInfo.name,
        newInfo.date ? newInfo.date : oldInfo.date,
        oldInfo.id,
      ];
      const result = await pool.query(
        "UPDATE tournaments SET name = ?, date = ? WHERE id = ? AND visible = 1",
        update
      );
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // Eliminiar torneo por id
  async deleteTournamentById(id) {
    try {
      const pool = await db();
      const [result] = await pool.query(
        "UPDATE tournaments SET visible = 0 WHERE id = ? AND visible = 1",
        [id]
      );
      return result;
    } catch {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

};

module.exports = TournamentModel;
