//buscar por queryparams-- por ID = get(estudiantes/:id

const estudianteBD = require('../baseDatos/estudianteBD');

buscarPorId = async(req, res) => {
    try{
        const idEstudiante = req.params.idEstudiante;   
        
        if(!idEstudiante) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }
        
        const [estudiante] = await estudianteBD.buscarPorId(idEstudiante);
        // buscarPorId ejecuta la sentencia SQL para obtener la info de la BD.
        res.json({estado:'OK', dato:estudiante});

    }catch (exec){
        throw exec;
    }
}
buscarNombre = async (req, res) => {
    try {
      const nombreEstudiante = req.params.nombreEstudiante;
  
      if (!nombreEstudiante) {
        res.status(400).json({ estado: 'FALLO', msj: 'Falta el nombre del estudiante' });
      }
  
      const estudiante = await estudianteBD.buscarNombre(nombreEstudiante);
      res.json({ estado: 'OK', dato: estudiante });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ estado: 'FALLO', msj: 'Error en el servidor' });
    }
  };

buscarTodos = async(req, res) => {

    const page = req.query.page
    const limit = req.query.limit
    console.log({page, limit})
    try{
        const [estudiantes, totalResultados] = await estudianteBD.buscarTodos({page, limit});
        const paginasTotales = Math.ceil(totalResultados / limit)
        res.json({estado:'OK',totalResultados, dato:estudiantes});

    }catch (exec){
        throw exec;
    }
}

eliminar = async (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    if (!idEstudiante) {
        return res.status(400).json({ estado: 'FALLO', msj: 'No se especificó el id del estudiante' });
    }

    try {
        await estudianteBD.eliminar(idEstudiante);
        res.status(200).json({ estado: 'OK', msj: 'Estudiante eliminado' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ estado: 'FALLO', msj: 'Error interno del servidor' });
    }
};

crear = async (req, res) => {

    const {dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular} = req.body;
    // obtengo el archivo que manda el cliente
    const file = req.file;

    if(!dni || !nombre || !apellido || !nacionalidad || !correoElectronico.includes('@')){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        
        const estudiante = {
            dni:dni, 
            nombre: mayusMinusculaNombreCompleto(nombre),
            apellido: mayusMinusculaNombreCompleto(apellido),
            fechaNacimiento:fechaNacimiento, 
            nacionalidad:nacionalidad, 
            correoElectronico:todoMinuscula(correoElectronico), 
            celular:celular, 
            //  foto:file.filename // guardo en la base de datos el nombre del archivo
        }; 
        if (file) estudiante.foto = file.filename;
        else estudiante.foto='default.jpg'

        try{
            const estudianteNuevo = await estudianteBD.nuevo(estudiante);
            res.status(201).json({estado:'ok', msj:'Estudiante creado', dato:estudianteNuevo});
        }catch(exec){
            throw exec;
        }
    }
}
function mayusMinusculaNombreCompleto(nombreCompleto) {
    if (!nombreCompleto) {
        return '';
    }

    const partes = nombreCompleto.split(" ");
    const nombreFormateado = partes
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) 
        .join(" ");

    return nombreFormateado;
}
function todoMinuscula(correo) {
    if (!correo) {
        return '';
    }
    return correo.toLowerCase();
}

update = async(req,res)=>{
    const body = req.body

    const idEstudiante = req.params.idEstudiante
    // Agregar validación a Carrera y Materia UPDATE
    const {dni, nombre, apellido} = req.body

    if (!dni || !nombre || !apellido) return res.status(409).json({status:"Fallo", mje:"Faltan datos obligatorios"})

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
    body.nombre = mayusMinusculaNombreCompleto(body.nombre);
    body.apellido = mayusMinusculaNombreCompleto(body.apellido);
    body.correoElectronico = todoMinuscula(body.correoElectronico);

    try {
        const estudianteActualizado = await estudianteBD.update(idEstudiante, body);
        res.status(200).json({ status: "OK",msj:'Estudiante modificado correctamente', data: estudianteActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "Fallo", mje:'Hubo un error'})
    }
}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    crear, 
    update,
    buscarNombre
}