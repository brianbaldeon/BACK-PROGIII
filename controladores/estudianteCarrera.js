const estudianteCarreraBD = require('../baseDatos/estudianteCarreraBD');


const estudianteCarrera  = async (req, res) => {
    const idCarrera = req.params.idCarrera;
    const idEstudiante = req.params.idEstudiante;
    try{
        // const solo si lo quiero devolver al cliente...
        await estudianteCarreraBD.estudianteCarrera(idCarrera,idEstudiante);
        res.status(201).json({estado:'OK', msj:'Inscripción Realizada'});
    }catch (error){
        console.log(error.message);
        if(error.message == "Estudiante ya esta inscripto"){
            return res.status(400).json({msj:error.message});
            
        }else{
            return res.status(500).json({msj:'Error interno del Servidor',error});
        }
    }
}
const obtenerNoInscriptos= async (req,res)=>{
    const idCarrera = req.params.idCarrera;

    try{
        // const solo si lo quiero devolver al cliente...
        const estudiantes = await estudianteCarreraBD.obtenerNoInscriptos(idCarrera);
        res.status(200).json({estado:'OK' ,dato: estudiantes});
    }catch (error){
        console.log(error.message);
        return res.status(500).json({msj:'Error interno del Servidor',error});
        
    }

}
const obtenerInscriptos = async (req,res)=>{
    const idCarrera = req.params.idCarrera;
    try{
        // const solo si lo quiero devolver al cliente...
        const estudiantes = await estudianteCarreraBD.obtenerInscriptos(idCarrera);
        res.status(200).json({estado:'OK' ,dato: estudiantes});
    }catch (error){
        console.log(error.message);
        return res.status(500).json({msj:'Error interno del Servidor',error});
        
    }
}
const bajaEstudianteCarrera = async (req, res)=>{
    const idEstudiante = req.params.idEstudiante;
    const idCarrera = req.params.idCarrera;
    try{
        // const solo si lo quiero devolver al cliente...
        await estudianteCarreraBD.bajaEstudianteCarreraBD(idEstudiante,idCarrera);
        res.status(200).json({estado:'OK' });
    }catch (error){
        console.log(error.message);
        return res.status(500).json({msj:'Error interno del Servidor',error});
        
    }
}


module.exports = {
    estudianteCarrera,
    obtenerNoInscriptos,
    obtenerInscriptos,
    bajaEstudianteCarrera
}