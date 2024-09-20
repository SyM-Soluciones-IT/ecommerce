const TournamentModel = require("../models/Tournament");

const updateTournamentById = async (id, newInfo) => {
    const oldInfo = await TournamentModel.getTournamentById(id);
    if (!oldInfo || oldInfo.length === 0) {
        return false;
    }
    try {
        const result = await TournamentModel.updateTournament(oldInfo, newInfo);
        if (result.affectedRows === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { updateTournamentById };