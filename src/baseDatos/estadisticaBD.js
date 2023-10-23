const conexion = require('./conexionBD');

const estadistica = async () => {
    // este procedimiento almacenado retorna 2 valores de forma separada la proxima clase lo mejoramos
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
    console.log(results);
    const estudiantes = results[1][0].estudiantes;
  

    const datos = {
     estudiantes: estudiantes
    }

    return datos;
}


module.exports = {
    estadistica
}
