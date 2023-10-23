//buscar por queryparams-- por ID = get(estudiantes/:id

const estudianteBD = require('../baseDatos/estudianteBD');

buscarPorId = async(req, res) => {
    try{
        const idEstudiante = req.params.idEstudiante;   
        
        if(!idEstudiante) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }
        
        const estudiante = await estudianteBD.buscarPorId(idEstudiante);
        // buscarPorId ejecuta la sentencia SQL para obtener la info de la BD.

        res.json({estado:'OK', dato:estudiante});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) => {
    try{
        const estudiantes = await estudianteBD.buscarTodos();

        res.json({estado:'OK', dato:estudiantes});

    }catch (exec){
        throw exec;
    }
}

eliminar = async (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    if(!idEstudiante){
        res.status(404).json({estado:'FALLO', msj:'no se especifico el id del estudiante'});
    }else{
        try{
            await estudianteBD.eliminar(idEstudiante);
            res.status(200).json({estado:'OK', msj:'Estudiante eliminado'});
        }catch (error){
            throw exec;
        }
    }
}

crear = async (req, res) => {

    const {dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto} = req.body;

    if(!dni || !nombre || !apellido || !nacionalidad || !correoElectronico){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const estudiante = {
            dni:dni, 
            nombre:nombre, 
            apellido:apellido, 
            fechaNacimiento:fechaNacimiento, 
            nacionalidad:nacionalidad, 
            correoElectronico:correoElectronico, 
            celular:celular, 
            foto:foto
        }; 


        try{
            const estudianteNuevo = await estudianteBD.nuevo(estudiante);
            res.status(201).json({estado:'ok', msj:'Estudiante creado', dato:estudianteNuevo});
        }catch(exec){
            throw exec;
        }
    }
}

update = async(req,res)=>{
    const body = req.body
    const idEstudiante = req.params.idEstudiante

    if (!idEstudiante) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "El parámetro idEstudiante no puede ser vacío."
                }
            });
    }

    try {
        const estudianteActualizado = await estudianteBD.update(idEstudiante, body);
        res.send({ status: "OK", data: estudianteActualizado });
    } catch (error) {
        /*res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });*/
    }
}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear, 
    update
}
