const conexion = require('./conexionBD');

const estudianteMateria =  async (idCarrera, idMateria, idEstudiante) => {
    consulta = `SELECT COUNT(*) AS contador FROM estudiantecarrera WHERE carrera = ? AND estudiante = ?`;

    const [resultado] = await conexion.query(consulta , [idCarrera,idEstudiante])
    const [verificar] = resultado
    // console.log(verificar.contador)
    if (verificar.contador >0){
        console.log('Se puede inscribir')
        consulta = `SELECT COUNT(*) AS contador FROM estudianteMateria WHERE materia = ? AND estudiante = ?`

        const [resultado] = await conexion.query(consulta , [idMateria, idEstudiante])
        const [verificar1] = resultado
        if (verificar1.contador <= 0){
            //si se cumple este condicional entonces podemos inscribir. 
            console.log(verificar1)
            const fecha = new Date();
            consulta = 'INSERT INTO estudiantemateria SET estudiante = ?, materia = ?, fecha = ?'
            const resultado1= await conexion.query( consulta , [idEstudiante, idMateria, fecha])
            console.log(resultado1)
        }else{
            // Error 1 significa: "Estudiante ya esta inscripto a la Materia."
            throw new Error(1)
        }
    }else{
        // Error 2 significa: "El estudiante debe estar inscripto a la Carrera."
        throw new Error(2)
    }

}
const obtenerInscriptos = async (idMateria, idCarrera) => {
    const consulta = `SELECT * FROM estudiante AS e INNER JOIN estudiantecarrera AS ec ON e.idEstudiante = ec.estudiante WHERE ec.carrera = ? AND e.activo = 1 AND ec.fechaBaja IS NULL`
    const resultado = await conexion.query(consulta, [idMateria, idCarrera])

    return resultado
}

const obtenerNoInscriptos = async (idMateria, idCarrera) => {
    // const consulta = `SELECT * FROM estudiante AS e WHERE NOT EXISTS ( SELECT * FROM estudiantemateria AS em WHERE e.idEstudiante = em.estudiante AND em.materia = ? ) AND e.activo = '1'`
    const consulta = `SELECT * FROM estudiante AS e WHERE e.idEstudiante IN ( SELECT estudiante FROM estudiantecarrera AS ec WHERE ec.carrera = ? AND ec.fechaBaja IS NULL ) AND NOT EXISTS ( SELECT * FROM estudiantemateria AS em WHERE e.idEstudiante = em.estudiante AND em.materia = ? ) AND e.activo = '1';`
    
    const [resultado] = await conexion.query(consulta, [idCarrera, idMateria])

    return resultado
}

const estudianteBajaMateria = async (idMateria, idCarrera, idEstudiante) => { 
    const consulta = 'DELETE FROM estudiantemateria WHERE estudiante = ? AND materia = ?'
    const resultado = await conexion.query()

}

const obtenerInscripciones = async (idMateria) => {
    const consulta = 'SELECT em.fecha, m.nombre AS nombreMateria, e.nombre, e.apellido FROM `estudiantemateria` AS em INNER JOIN estudiante AS e ON e.idEstudiante = em.estudiante INNER JOIN materia AS m ON m.idMateria = em.materia WHERE em.materia = ?';
    const [resultados] = await conexion.query(consulta, [idMateria]);

    return resultados
}


module.exports = {estudianteMateria, obtenerInscriptos, obtenerNoInscriptos, estudianteBajaMateria, obtenerInscripciones}