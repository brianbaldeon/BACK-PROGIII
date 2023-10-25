const conexion = require('./conexionBD');

const buscarPorId = async (idCarrera) => {

    const consulta = `SELECT  nombre, 
    (CASE
        WHEN modalidad = 0 THEN 'Virtual'
        WHEN modalidad = 1 THEN 'Presencial'
        ELSE ''
    END) AS modalidad
    FROM Carrera 
    WHERE activo = 1 AND idCarrera = ?`;

    const [carrera] = await conexion.query(consulta,idCarrera);    

    return carrera;
}

const buscarTodos = async () => {

    const consulta = `SELECT  idCarrera, nombre, 
    (CASE
        WHEN modalidad = 0 THEN 'Virtual'
        WHEN modalidad = 1 THEN 'Presencial'
        ELSE ''
    END) AS modalidad
    FROM Carrera 
    WHERE activo = 1`;
    const [carreras] = await conexion.query(consulta);    

    return carreras;

}

const eliminar = async (idCarrera) => {
    const consulta = 'UPDATE carrera SET activo = 1 WHERE idCarrera = ?';
    await conexion.query(consulta, [idCarrera]);    
}


const nuevo = async (carrera) => {


    const consulta = 'INSERT INTO carrera SET ?';
    const [carreraNueva] = await conexion.query(consulta, carrera);

    return buscarPorId(carreraNueva.insertId);
}

const update = async(idCarrera ,{nombre,modalidad})=>{
    const consulta = `UPDATE carrera SET nombre = ?, modalidad =? WHERE idCarrera = ?`;
    await conexion.query(consulta, [nombre,modalidad, idCarrera]); //

    return buscarPorId(idCarrera); 

}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    nuevo,
    update
}