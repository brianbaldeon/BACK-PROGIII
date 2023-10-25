const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN nacionalidad = 0 THEN 'Argentino'
        WHEN nacionalidad = 1 THEN 'Uruguayo'
        WHEN nacionalidad = 2 THEN 'Chileno'
        WHEN nacionalidad = 3 THEN 'Paraguayo'
        WHEN nacionalidad = 4 THEN 'Brasilero'
        WHEN nacionalidad = 5 THEN 'Boliviano'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}
const buscarNombre = async (nombreEstudiante) => {
    const consulta = `
    SELECT idEstudiante,dni, nombre, apellido,
    (CASE
        WHEN nacionalidad = 0 THEN 'Argentino'
        WHEN nacionalidad = 1 THEN 'Uruguayo'
        WHEN nacionalidad = 2 THEN 'Chileno'
        WHEN nacionalidad = 3 THEN 'Paraguayo'
        WHEN nacionalidad = 4 THEN 'Brasilero'
        WHEN nacionalidad = 5 THEN 'Boliviano'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1 AND LOWER(nombre) LIKE LOWER(?)`;

    const [estudiante] = await conexion.query(consulta, `%${nombreEstudiante}%`);

    return estudiante;
};

const buscarTodos = async () => {

    const consulta = `SELECT  idEstudiante,dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto, 
    (CASE
        WHEN nacionalidad = 0 THEN 'Argentino'
        WHEN nacionalidad = 1 THEN 'Uruguayo'
        WHEN nacionalidad = 2 THEN 'Chileno'
        WHEN nacionalidad = 3 THEN 'Paraguayo'
        WHEN nacionalidad = 4 THEN 'Brasilero'
        WHEN nacionalidad = 5 THEN 'Boliviano'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1`;

    const [estudiantes] = await conexion.query(consulta);    

    return estudiantes;
}

const eliminar = async (idEstudiante) => {
    const consulta = 'UPDATE estudiante SET activo = 0 WHERE idEstudiante = ?';
    await conexion.query(consulta, [idEstudiante]);    
}


const nuevo = async (estudiante) => {


    const consulta = 'INSERT INTO estudiante SET ?';
    const [estudianteNuevo] = await conexion.query(consulta, estudiante);

    return buscarPorId(estudianteNuevo.insertId);
}

const update = async(idEstudiante ,{dni,nombre,apellido,fechaNacimiento,nacionalidad,correoElectronico,celular})=>{
    const consulta = `UPDATE estudiante SET dni = ?, nombre = ?, apellido =?,fechaNacimiento=?, nacionalidad=?, correoElectronico=?,celular=? WHERE idEstudiante = ?`;
    await conexion.query(consulta, [dni,nombre,apellido,fechaNacimiento,nacionalidad, correoElectronico,celular,idEstudiante])

    return buscarPorId(idEstudiante)

}



module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    nuevo,
    update,
    buscarNombre
}