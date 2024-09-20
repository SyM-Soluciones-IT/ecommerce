const SetModel = require("../models/Set");
const setService = require("../services/setService");

const getSets = async (req, res) => {
    try {
        const sets = await SetModel.getSets();
        if (!sets) {
            return res.status(404).json({ message: "Sets no encontrados" });
        }
        res.json(sets);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const getSetById = async (req, res) => {
    const { id } = req.params;
    try {
        const set = await SetModel.getSetById(id);
        if (!set) {
            return res.status(404).json({ message: "Set no encontrado" });
        }
        res.json(set);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const createSet = async (req, res) => {
    const { result_1, result_2 } = req.body;
    try {
        if (!result_1 || !result_2) {
            return res.status(400).json({ message: "Todos los resultados son obligatorios" });
        }

        const result = await SetModel.createSet(result_1, result_2);
        res.status(201).json({ id: result.insertId, result_1, result_2 });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const updateSet = async (req, res) => {
    const { id } = req.params;
    const setInfo = req.body;

    try {
        if (!setInfo.result_1 && !setInfo.result_2) {
            return res.status(400).json({ message: "Un resultado es obligatorio" });
        }
        const result = await setService.updateSetById(id, setInfo);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Set no encontrado" });
        }
        res.json({ message: "Set actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const deleteSet = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await SetModel.deleteSet(id);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Set no encontrado" });
        }
        res.json({ message: "Set eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

const getSetStats = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await setService.getSetStats(id);
        if (!results) {
            return res.status(404).json({ message: "Set no encontrado" });
        }
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
};

module.exports = {
    getSets,
    getSetById,
    createSet,
    updateSet,
    deleteSet,
    getSetStats
};
