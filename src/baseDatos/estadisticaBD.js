const conexion = require('./conexionBD');

const estadistica = async () => {
    // este procedimiento almacenado retorna 2 valores de forma separada la proxima clase lo mejoramos
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
        const cantidadInscriptos = results[0][0].cantidadInscriptos;
        const mayoresDe = results[0][1].mayoresDe;

        const datos = {
            estudiantecarrera: cantidadInscriptos,
            estudiantes: mayoresDe
    }

    return datos;
}


module.exports = {
    estadistica
}
