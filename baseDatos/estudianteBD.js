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

const buscarTodos = async ({page, limit}) => {

    let consulta = `SELECT  idEstudiante,dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto, 
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

    if (page && limit) {
        const offset = (page - 1) * limit
        const string = ` LIMIT ${limit} OFFSET ${offset}`
        consulta += string
    }
    console.log({consulta})
    const [estudiantes] = await conexion.query(consulta);    
    



    return [estudiantes, 50];
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



const buscarNombre = async (nombreApellidoEstudiante) => {
    const consulta = `
    SELECT  idEstudiante,dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto, 
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
    WHERE activo = 1 AND (LOWER(nombre) LIKE LOWER(?) OR LOWER(apellido) LIKE LOWER(?))`;

    const [estudiantes] = await conexion.query(consulta, [`%${nombreApellidoEstudiante}%`, `%${nombreApellidoEstudiante}%`]);

    return estudiantes;
};
const buscarDni = async (dniEstudiante) => {
    const consulta = `
    SELECT  idEstudiante,dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto, 
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
    WHERE activo = 1 AND dni = ?`;

    const [estudiante] = await conexion.query(consulta, dniEstudiante);

    return estudiante;
};


module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    nuevo,
    update,
    buscarNombre,
    buscarDni

}