const conexion = require('./conexionBD');

const estadistica = async () => {
    // este procedimiento almacenado retorna 2 valores de forma separada la proxima clase lo mejoramos
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    
    
    
    console.log(results);

    const datos  = {
        cantidadInscriptos: results[0][0].cantidadInscriptos, 
        cantidadMaterias: results[0][0].cantidadMaterias,
        cantidadCarreras: results[0][0].cantidadCarreras,
        
        
    }
   

    return datos;
}


module.exports = {
    estadistica
}
