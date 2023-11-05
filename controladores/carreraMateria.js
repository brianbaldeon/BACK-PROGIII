const carreraMateriaBD = require('../baseDatos/carreraMateriaBD');

const carreraMateria =  async (req,res) =>{
    const idCarrera = req.params.idCarrera;
    try{
        const materias = await carreraMateriaBD.materiasCarrera(idCarrera);
        res.status(200).json({status: 'OK', dato: materias});
        

    }
    catch(err){
        console.log(err);
        res.status(500).json({msj: 'Error interno del servidor'})

    }


}

module.exports = {carreraMateria}
