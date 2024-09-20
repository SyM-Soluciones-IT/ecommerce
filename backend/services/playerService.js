const playerModel = require("../models/Player");

const updatePlayerByDNI = async (dni, newInfo) => {
    const oldInfo = await playerModel.getPlayerByDNI(dni);
    if (!oldInfo || oldInfo.length === 0) {
        return false;
    }
    try {
        const result = await playerModel.updatePlayer(oldInfo, newInfo);
        if (result.affectedRows === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { updatePlayerByDNI };
