const TournamentModel = require("../models/Tournament");
const tournamentService = require("../services/tournamentService");

const getTournamentById = async (req, res) => {
  const { id } = req.params;

  try {
    const tournament = await TournamentModel.getTournamentById(id);
    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getTournaments = async (req, res) => {
  try {
    const tournaments = await TournamentModel.getTournaments();
    if (!tournaments) {
      return res.status(404).json({ message: "Torneos no encontrados" });
    }
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const createTournament = async (req, res) => {
  const { name, date } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const result = await TournamentModel.createTournament(name, date || null);
    res.status(201).json({ id: result.insertId, name, date: date || null });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updateTournament = async (req, res) => {
  const { id } = req.params;
  const tournamentInfo = req.body;

  try {
    if (!tournamentInfo.name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const result = await tournamentService.updateTournamentById(id, tournamentInfo);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    res.json({ message: "Torneo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const deleteTournamentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await TournamentModel.deleteTournamentById(id);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    res.json({ message: "Torneo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = {
  getTournamentById,
  getTournaments,
  createTournament,
  updateTournament,
  deleteTournamentById,
};
