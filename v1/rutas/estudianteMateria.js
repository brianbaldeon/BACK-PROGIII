const Router = require('express');

const  controlador = require('../../controladores/estudianteMateria');
const router = Router();

router
//Creamos nueva inscripcion a Materia del estudiante
    .post('/carrera/:idCarrera/materia/:idMateria/estudiante/:idEstudiante', controlador.estudianteMateria)
    .delete('/carrera/:idCarrera/materia/:idMateria/estudiante/:idEstudiante', controlador.estudianteBajaMateria)
    .get('/carrera/:idCarrera/materia/:idMateria/inscriptos', controlador.obtenerInscriptos)
    .get('/carrera/:idCarrera/materia/:idMateria/noInscriptos', controlador.obtenerNoInscriptos)
    .get('/materia/:idMateria/inscripciones', controlador.obtenerInscripciones)

module.exports = router;