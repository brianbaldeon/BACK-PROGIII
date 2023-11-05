const conexion = require('./conexionBD');

const buscarPorId = async (idMateria) => {

    const consulta = `SELECT  horasSemanales, nombre, 
    (CASE
        WHEN tipoMateria = 0 THEN 'Virtual'
        WHEN tipoMateria = 1 THEN 'Presencial'
        ELSE ''
    END) AS tipoMateria 
    FROM materia 
    WHERE activo = 1 AND idMateria = ?`;

    const [materia] = await conexion.query(consulta,idMateria);    

    return materia;
}

const buscarTodos = async () => {

    const consulta = `SELECT  idMateria, horasSemanales, nombre, 
    (CASE
        WHEN tipoMateria = 0 THEN 'Virtual'
        WHEN tipoMateria = 1 THEN 'Presencial'
        ELSE ''
    END) AS tipoMateria 
    FROM materia 
    WHERE activo = 1`;
    const [materias] = await conexion.query(consulta);    

    return materias;

}

const eliminar = async (idMateria) => {
    const consulta = 'UPDATE materia SET activo = 0 WHERE idMateria = ?';
    await conexion.query(consulta, [idMateria]);    
}


const nuevo = async (materia) => {


    const consulta = 'INSERT INTO materia SET ?';
    const [materiaNueva] = await conexion.query(consulta, materia);

    return buscarPorId(materiaNueva.insertId);
}

const update = async(idMateria ,{horasSemanales,nombre,tipoMateria})=>{
    const consulta = `UPDATE materia SET horasSemanales = ?, nombre = ?, tipoMateria =? WHERE idMateria = ?`;
    await conexion.query(consulta, [horasSemanales,nombre,tipoMateria, idMateria]); //

    return buscarPorId(idMateria); 

}
const buscarAsignatura = async (nombreAsignatura) => {
    const consulta = `
        SELECT idMateria, horasSemanales, nombre,
        CASE
            WHEN tipoMateria = 0 THEN 'Virtual'
            WHEN tipoMateria = 1 THEN 'Presencial'
            ELSE ''
        END AS tipoMateria
        FROM materia
        WHERE activo = 1 AND LOWER(nombre) LIKE LOWER(?)`;

    const [materias] = await conexion.query(consulta, [`%${nombreAsignatura}%`]);

    return materias;
};


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    nuevo,
    update,
    buscarAsignatura,
}