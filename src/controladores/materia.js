//buscar por queryparams-- por ID = get(estudiantes/:id

const materiaBD = require('../baseDatos/materiaBD');

buscarPorId = async(req, res) => {
    try{
        const idMateria = req.params.idMateria;   
        
        if(!idMateria) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }
        
        const materia = await materiaBD.buscarPorId(idMateria);
        res.json({estado:'OK', dato: materia});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) => {
    try{
        const materias = await materiaBD.buscarTodos();

        res.json({estado:'OK', dato:materias});

    }catch (exec){
        throw exec;
    }
}

eliminar = async (req, res) => {
    const idMateria = req.params.idMateria;

    if(!idMateria){
        res.status(404).json({estado:'FALLO', msj:'no se especifico el id de la materia'});
    }else{
        try{
            await materiaBD.eliminar(idMateria);
            res.status(200).json({estado:'OK', msj:'Materia eliminada'});
        }catch (error){
            throw exec;
        }
    }
}

crear = async (req, res) => {

    const {horasSemanales, nombre, tipoMateria} = req.body;

    if(!horasSemanales || !nombre || !tipoMateria){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const materia = {
            horasSemanales: horasSemanales,
            nombre:nombre, 
            tipoMateria: tipoMateria
        }; 


        try{
            const materiaNueva = await materiaBD.nuevo(materia);
            res.status(201).json({estado:'ok', msj:'Materia creada', dato:materiaNueva});
        }catch(exec){
            throw exec;
        }
    }
}

update = async(req,res)=>{
    const body = req.body
    const idMateria = req.params.idMateria

    if (!idMateria) {
        res
            .status(404)
            .send({
                status: "Fallo",
                data: {
                    error: "El parámetro idMateria no puede ser vacío."
                }
            });
    }

    try {
        const materiaActualizada= await materiaBD.update(idMateria, body);
        res.send({ status: "OK", data: materiaActualizada });
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

