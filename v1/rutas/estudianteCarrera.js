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
    .put('/carrera/:idCarrera/estudiante/:idEstudiante', controlador.bajaEstudianteCarrera)
    .get('/carrera/noInscriptos/:idCarrera', controlador.obtenerNoInscriptos)   
    .get('/carrera/inscriptos/:idCarrera',controlador.obtenerInscriptos);    

module.exports = router;