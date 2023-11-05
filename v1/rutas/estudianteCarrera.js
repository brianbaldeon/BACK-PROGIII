const Router = require('express');

const  controlador = require('../../controladores/estudianteCarrera');


const router = Router();


router
//Creamos nueva inscripcion a carrera del estudiante
    .post('/carrera/:idCarrera/estudiante/:idEstudiante', controlador.estudianteCarrera)
    .put('/carrera/:idCarrera/estudiante/:idEstudiante', controlador.bajaEstudianteCarrera)
    .get('/carrera/noInscriptos/:idCarrera', controlador.obtenerNoInscriptos)   
    .get('/carrera/inscriptos/:idCarrera',controlador.obtenerInscriptos);    

module.exports = router;