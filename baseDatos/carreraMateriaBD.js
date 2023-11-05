const conexion = require('./conexionBD');

const materiasCarrera =  async (idCarrera) =>{
    const consulta = `SELECT m.idMateria, m.horasSemanales, m.nombre, m.tipoMateria, m.activo FROM materia AS m INNER JOIN carreramateria AS cm WHERE cm.idCarrera = ? AND cm.activo = 1 AND m.activo = 1 GROUP BY m.idMateria`;
    const [result] = await conexion.query(consulta, [idCarrera]);
    return result




}
module.exports = {materiasCarrera}