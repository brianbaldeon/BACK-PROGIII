const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN nacionalidad = 0 THEN 'arg'
        WHEN nacionalidad = 1 THEN 'uru'
        WHEN nacionalidad = 2 THEN 'chi'
        WHEN nacionalidad = 3 THEN 'par'
        WHEN nacionalidad = 4 THEN 'bra'
        WHEN nacionalidad = 5 THEN 'bol'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}

const buscarTodos = async () => {

    const consulta = `SELECT  dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto, 
    (CASE
        WHEN nacionalidad = 0 THEN 'argentino'
        WHEN nacionalidad = 1 THEN 'uruguayo'
        WHEN nacionalidad = 2 THEN 'chileno'
        WHEN nacionalidad = 3 THEN 'paraguayo'
        WHEN nacionalidad = 4 THEN 'brasilero'
        WHEN nacionalidad = 5 THEN 'boliviano'
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

const update = async(idEstudiante ,{dni,nombre,apellido})=>{
    const consulta = `UPDATE estudiante SET dni = ?, nombre = ?, apellido =? WHERE idEstudiante = ?`;
    await conexion.query(consulta, [dni,nombre,apellido, idEstudiante])

    return buscarPorId(idEstudiante)

}


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    nuevo,
    update
}