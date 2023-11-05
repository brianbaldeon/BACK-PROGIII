const estudianteMateriaBD = require('../baseDatos/estudianteMateriaBD');

const estudianteMateria =  async (req, res) => {
    const idCarrera = req.params.idCarrera;
    const idMateria = req.params.idMateria;
    const idEstudiante = req.params.idEstudiante;

    try{
        await estudianteMateriaBD.estudianteMateria(idCarrera, idMateria, idEstudiante);
        res.status(200).json({status: 'OK', msj:'Estudiante inscripto exitosamente'})
        
    }catch (error){
        console.log(error.message);
        if(error.message == 1){
            return res.status(400).json({msj:"Estudiante ya esta inscripto a la Materia."});
            
        }else if(error.message == 2){
            return res.status(400).json({msj:"El estudiante debe estar inscripto a la Carrera"});
        }
        else{
            return res.status(500).json({msj:'Error interno del Servidor',error});
        }
    }
}

const obtenerNoInscriptos = async (req, res) => {
     const idCarrera = req.params.idCarrera;
     const idMateria = req.params.idMateria;

    try {

        const noInscriptos = await estudianteMateriaBD.obtenerNoInscriptos(idMateria, idCarrera)

        res.status(200).json({status:'OK', dato:noInscriptos})
    }
    catch (error) {
        res.status(500).json({msj:'Error interno del servidor'})
    }
}
const obtenerInscriptos = async (req, res) => {
     const idCarrera = req.params.idCarrera;
     const idMateria = req.params.idMateria;

    try {

        const inscriptos = await estudianteMateriaBD.obtenerInscriptos(idMateria, idCarrera)

        res.status(200).json({status:'OK', dato:inscriptos})
    }
    catch (error) {
        res.status(500).json({msj:'Error interno del servidor'})
    }
}


const estudianteBajaMateria = async (req, res) => {
    const idMateria = req.params.idMateria;
    const idCarrera = req.params.idCarrera;
    const idEstudiante = req.params.idEstudiante;

    try {
        
        await estudianteMateriaBD.estudianteBajaMateria(idMateria, idCarrera, idEstudiante)
        res.status(200).json({status:'OK'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({msj:'error interno del servidor'})
    }
}


const obtenerInscripciones = async (req, res) => {
    const idMateria = req.params.idMateria

    try {

        const inscripciones = await estudianteMateriaBD.obtenerInscripciones(idMateria)
        res.status(200).json({status:'OK', dato:inscripciones})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({msj:'error interno del servidor'})
    }
}
module.exports = {estudianteMateria, obtenerNoInscriptos, obtenerInscriptos, estudianteBajaMateria,obtenerInscripciones}