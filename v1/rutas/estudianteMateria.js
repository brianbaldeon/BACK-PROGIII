const Router = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validarCampos');

const  controlador = require('../../controladores/estudianteMateria');
const router = Router();

router
//Creamos nueva inscripcion a Materia del estudiante
    .post('/carrera/:idCarrera/materia/:idMateria/estudiante/:idEstudiante', [
        check('idCarrera','La carrera es requerida').not().isEmpty(),
        check('idEstudiante','El estudiante es requerido').not().isEmpty(),
        check('idMateria','La materia es requerida').not().isEmpty(),
            validarCampos   
        ], controlador.estudianteMateria)
    .delete('/carrera/:idCarrera/materia/:idMateria/estudiante/:idEstudiante', controlador.estudianteBajaMateria)
    .get('/carrera/:idCarrera/materia/:idMateria/inscriptos', controlador.obtenerInscriptos)
    .get('/carrera/:idCarrera/materia/:idMateria/noInscriptos', controlador.obtenerNoInscriptos)
    .get('/materia/:idMateria/inscripciones', controlador.obtenerInscripciones)

module.exports = router;