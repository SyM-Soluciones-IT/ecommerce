const serviceModel = require("../models/Set");

const updateSetById = async (id, newInfo) => {
    const oldInfo = await serviceModel.getSetById(id);
    if (!oldInfo || oldInfo.length === 0) {
        return false;
    }
    try {
        const result = await serviceModel.updateSet(oldInfo, newInfo);
        if (result.affectedRows === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};

const getSetStats = async (id) =>{
    const results = await serviceModel.getSetStats(id);
    if (!results || results.length === 0) {
        return false;
    }
    const puntoPorPunto = results.map(({ punto, puntaje_1, puntaje_2 }) => ({ punto, puntaje_1, puntaje_2 }));
    const estadisticas = getEstadisticas(results);
    return { puntoPorPunto, estadisticas }; 

}

const getEstadisticas = (results) =>{

    let maxRacha1 = 0;
    let maxRacha2 = 0;
    let racha1 = 0;
    let racha2 = 0;
    let puntosGanadosConSaque1 = 0;
    let puntosGanadosConSaque2 = 0;

    

    results.forEach((result,index) => {
        if(result.punto === 1){
            if(result.puntaje_1 === 1){
                racha1 =1;
                if(result.saque==result.id_jugador_1){
                    puntosGanadosConSaque1++
                }
            }
            else{
                racha2 =1;
                if(result.saque==result.id_jugador_2){
                    puntosGanadosConSaque2++
                }
            }
        }
        else{
            let prev = results[index-1];
            if(result.puntaje_1 === (prev.puntaje_1 + 1)){
                racha1++;
                if(racha2 > maxRacha2){
                    maxRacha2 = racha2;
                }
                if(result.saque==result.id_jugador_1){
                    puntosGanadosConSaque1++
                }
                racha2 = 0;
            }
            if(result.puntaje_2 === (prev.puntaje_2 + 1)){
                racha2++;
                if(racha1 > maxRacha1){
                    maxRacha1 = racha1;
                }
                if(result.saque==result.id_jugador_2){
                    puntosGanadosConSaque2++
                }
                racha1 = 0;
            }

        }
     });

    return {maxRacha1: maxRacha1, maxRacha2: maxRacha2, puntosGanadosConSaque1: puntosGanadosConSaque1, puntosGanadosConSaque2: puntosGanadosConSaque2};
    
}

module.exports = { updateSetById,getSetStats };