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
    .delete('/carrera/:idCarrera/materia/:idMateria/estudiante/:idEstudiante', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
        check('idMateria', 'El id de materia es requerido').not().isEmpty(),
        check('idEstudiante', 'El id de estudiante es requerido').not().isEmpty(),
            validarCampos
    ], controlador.estudianteBajaMateria)
    .get('/carrera/:idCarrera/materia/:idMateria/inscriptos', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
        check('idMateria', 'El id de materia es requerido').not().isEmpty(),
            validarCampos
    ], controlador.obtenerInscriptos)
    .get('/carrera/:idCarrera/materia/:idMateria/noInscriptos', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
        check('idMateria', 'El id de materia es requerido').not().isEmpty(),
            validarCampos
    ], controlador.obtenerNoInscriptos)
    .get('/materia/:idMateria/inscripciones', [
        check('idMateria', 'El id de materia es requerido').not().isEmpty(),
            validarCampos
    ], controlador.obtenerInscripciones)

module.exports = router;