//buscar por queryparams-- por ID = get(estudiantes/:id

const carreraBD = require('../baseDatos/carreraBD');

buscarPorId = async(req, res) => {
    try{
        const idCarrera = req.params.idCarrera;   
        
        if(!idCarrera) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }
        
        const carrera = await carreraBD.buscarPorId(idCarrera);
        // buscarPorId ejecuta la sentencia SQL para obtener la info de la BD.

        res.json({estado:'OK', dato: carrera});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) => {
    try{
        const carreras = await carreraBD.buscarTodos();

        res.json({estado:'OK', dato:carreras});

    }catch (exec){
        throw exec;
    }
}

eliminar = async (req, res) => {
    const idCarrera = req.params.idCarrera;

    if(!idCarrera){
        res.status(404).json({estado:'FALLO', msj:'no se especifico el id del estudiante'});
    }else{
        try{
            await carreraBD.eliminar(idCarrera);
            res.status(200).json({estado:'OK', msj:'Carrera eliminada'});
        }catch (error){
            throw exec;
        }
    }
}

crear = async (req, res) => {

    const {nombre, modalidad} = req.body;

    if(!nombre ||!modalidad){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const carrera = {
            nombre:nombre, 
            modalidad: modalidad
        }; 


        try{
            const carreraNueva = await carreraBD.nuevo(carrera);
            res.status(201).json({estado:'ok', msj:'Carrera creada', dato:carreraNueva});
        }catch(exec){
            throw exec;
        }
    }
}

update = async(req,res)=>{
    const body = req.body
    const idCarrera = req.params.idCarrera

    if (!idCarrera) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "El parámetro idCarrera no puede ser vacío."
                }
            });
    }

    try {
        const carreraActualizada = await carreraBD.update(idCarrera, body);
        res.send({ status: "OK", data: carreraActualizada });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
    }
}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear, 
    update
}
