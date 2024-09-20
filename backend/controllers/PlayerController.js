const PlayerModel = require("../models/Player");
const playerService = require("../services/playerService");

const getPlayer = async (req, res) => {
  try {
    const player = await PlayerModel.getPlayerByDNI(req.params.dni);
    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await PlayerModel.getPlayers();
    if (!players || players.length === 0) {
      return res.status(404).json({ message: "Jugadores no encontrados" });
    }
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const savePlayer = async (req, res) => {
  const playerInfo = req.body;

  try {
    if (
      !playerInfo.dni ||
      !playerInfo.name ||
      !playerInfo.surname ||
      !playerInfo.birthdate ||
      !playerInfo.email ||
      !playerInfo.phone ||
      !playerInfo.province ||
      !playerInfo.city ||
      !playerInfo.category
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios en la solicitud." });
    }
    const result = await PlayerModel.createPlayer(playerInfo); // Añadido await
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Error agregando jugador" });
    }
    return res.status(201).json({ message: "Jugador agregado exitosamente" });
  } catch (err) {
    console.log(err);
     return res.status(500).json({ error: "Error en la base de datos" }); // Cambié el código de error a 500 para errores de servidor
  }
};

const deletePlayer = async (req, res) => {
  try {
    const result = await PlayerModel.deletePlayerByDNI(req.params.dni); // Se utiliza borrado lógico en el modelo
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }
    return res.status(200).json({ message: `Jugador con dni ${req.params.dni} eliminado exitosamente` });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updatePlayer = async (req, res) => {
  const { dni } = req.params;
  const playerInfo = req.body;

  try {
    if (!dni) {
      return res.status(400).json({ message: "Falta el dni." });
    }
    const result = await playerService.updatePlayerByDNI(dni, playerInfo);
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    return res.status(200).json({ message: "Jugador actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = { getPlayers, getPlayer, savePlayer, deletePlayer, updatePlayer };
