const conexion = require('./conexionBD');
  
const estudianteCarrera = async (idCarrera, idEstudiante) => {
    const verificar = `SELECT COUNT(*) AS contador FROM estudiantecarrera WHERE estudiante = ? AND carrera = ?;
    `
    const [resultado] = await conexion.query(verificar, [idEstudiante, idCarrera])
    const [verificcion] = resultado
    if (verificcion.contador <= 0) {
         console.log('Se puede inscribir')
         const fechaAlta = new Date();
         const consultaInscribir =  `INSERT INTO estudiantecarrera SET estudiante = ?, carrera = ?, fechaAlta = ?`
         const resultado = await conexion.query(consultaInscribir, [idEstudiante, idCarrera, fechaAlta])
         console.log({resultado})
        }
    else {
        throw new Error("Estudiante ya esta inscripto")
        // console.log('no se puede inscribir')
    }

    return 0;

}
const obtenerNoInscriptos = async (idCarrera) => {
    const consulta = `SELECT * FROM estudiante AS e WHERE NOT EXISTS ( SELECT * FROM estudiantecarrera AS ec WHERE e.idEstudiante = ec.estudiante AND ec.carrera = ? ) AND e.activo = '1'`;

    const [resultado] = await conexion.query(consulta, [idCarrera])
    return resultado
}

const obtenerInscriptos = async (idCarrera) => {
    const consulta = `SELECT * FROM estudiante AS e INNER JOIN estudiantecarrera AS ec ON e.idEstudiante = ec.estudiante WHERE ec.carrera = ? AND e.activo = 1 AND ec.fechaBaja IS NULL`;
    const [resultado] = await conexion.query(consulta , [idCarrera])
    return resultado

}

const bajaEstudianteCarreraBD = async (idEstudiante, idCarrera) => {

    const cn = await conexion.getConnection()
    try{
        await cn.beginTransaction()
        const consulta = `UPDATE estudiantecarrera SET fechaBaja = ? WHERE estudiante = ? AND carrera =?`
        const fechaBaja = new Date();
        const [resultado] = await cn.query(consulta, [fechaBaja, idEstudiante ,idCarrera])
        console.log(resultado)
        const consulta2= `SELECT idMateria FROM carreramateria WHERE idCarrera = ?`
        const [resultado2] = await cn.query(consulta2,[idCarrera]);
        console.log(resultado2)
        const materias = resultado2.map(materia => {
            return materia.idMateria
    
          })
        materias.forEach( async materia => {
            const consulta = 'DELETE FROM estudiantemateria WHERE estudiante = ? AND materia = ?'
            await cn.query(consulta, [idEstudiante, materia])
          })
        console.log({materias})

        await cn.commit();        
    }catch(e){
        await cn.rollback();
    }finally{
        cn.release();
    }

}


module.exports = {
    estudianteCarrera, obtenerNoInscriptos,obtenerInscriptos, bajaEstudianteCarreraBD
}
