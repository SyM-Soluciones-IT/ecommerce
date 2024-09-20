const db = require("../config/database");

const PlayerModel = {
  async getPlayerByDNI(dni) {
    try {
      const pool = await db();
      const rows = await pool.query("SELECT * FROM players WHERE dni = ? AND visible = 1", dni);
      return rows[0];
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async getPlayers() {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM players WHERE visible = 1");
      return rows;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async deletePlayerByDNI(dni) {
    try {
      const pool = await db();
      const [result] = await pool.query("UPDATE players SET visible = 0 WHERE dni = ?", dni);
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  // La fecha se guarda como YYYY-MM-DD . Hay que hablar para ver como llega y si llega distinta, transformarla.
  async createPlayer(playerInfo) {
    let playerImageDefault = "data:image/png;base64,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"
    try {
      const pool = await db();
      let result;
      if (!playerInfo.image) {
        [result] = await pool.query(
          "INSERT INTO players (dni, name, surname, birthdate, email, phone, category, province, city, image, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)",
          [
            playerInfo.dni,
            playerInfo.name,
            playerInfo.surname,
            playerInfo.birthdate,
            playerInfo.email,
            playerInfo.phone,
            playerInfo.category,
            playerInfo.province,
            playerInfo.city,
            playerInfo.image ? playerInfo.image : playerImageDefault,
          ]
        );
      } else {
        [result] = await pool.query(
          "INSERT INTO players (dni, name, surname, birthdate, email, phone, category, province, city,image, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)",
          [
            playerInfo.dni,
            playerInfo.name,
            playerInfo.surname,
            playerInfo.birthdate,
            playerInfo.email,
            playerInfo.phone,
            playerInfo.category,
            playerInfo.province,
            playerInfo.city,
            playerInfo.image,
          ]
        );
      }
      return result;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },

  async updatePlayer(oldInfo, newInfo) {
    try {
      const pool = await db();
      const arregloParaUpdate = [
        newInfo.name? newInfo.name : oldInfo[0].name,
        newInfo.surname? newInfo.surname : oldInfo[0].surname,
        newInfo.birthdate? newInfo.birthdate : oldInfo[0].birthdate,
        newInfo.email? newInfo.email : oldInfo[0].email,
        newInfo.phone? newInfo.phone : oldInfo[0].phone,
        newInfo.category? newInfo.category : oldInfo[0].category,
        newInfo.province? newInfo.province : oldInfo[0].province,
        newInfo.city? newInfo.city : oldInfo[0].city,
        newInfo.image? newInfo.image : oldInfo[0].image,
        oldInfo[0].dni
      ]

      const result = await pool.query(
        "UPDATE players SET name = ?, surname = ?, birthdate = ?, email = ?, phone = ?, category = ?, province = ?, city = ?, image = ? WHERE dni = ?, visible = 1",
        arregloParaUpdate
      );
      return result;

    } catch (err) {
      console.error("Error ejecutando la consulta:", err);
      throw err;
    }
  },
};

module.exports = PlayerModel;

/**
const mysql = require('mysql2/promise'); // Asegúrate de tener mysql2 instalado

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const playerSchema = {
  id: Number,
  dni: Number,
  nombre: String,
  apellido: String,
  nacimiento: Date,
  email: String,
  telefono: String,
  categoria: String,
  comentario: String,
  provincia: String,
  ciudad: String,
  timestamp: Date,
};

module.exports = { db, playerSchema };
 */
