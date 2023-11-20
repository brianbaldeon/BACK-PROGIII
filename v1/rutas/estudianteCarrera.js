const Router = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validarCampos');

const  controlador = require('../../controladores/estudianteCarrera');


const router = Router();


router
    .post('/carrera/:idCarrera/estudiante/:idEstudiante', [
        check('idCarrera','La carrera es requerida').not().isEmpty(),
        check('idEstudiante','El estudiante es requerido').not().isEmpty(),
            validarCampos   
        ], controlador.estudianteCarrera)
    .put('/carrera/:idCarrera/estudiante/:idEstudiante', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
        check('idEstudiante', 'El id de estudiante es requerido').not().isEmpty(),
            validarCampos
    ], controlador.bajaEstudianteCarrera)
    .get('/carrera/noInscriptos/:idCarrera', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
            validarCampos
    ], controlador.obtenerNoInscriptos)   
    .get('/carrera/inscriptos/:idCarrera', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
            validarCampos
    ], controlador.obtenerInscriptos);    

module.exports = router;