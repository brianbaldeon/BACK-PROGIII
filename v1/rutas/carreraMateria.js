const Router = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');

const  controlador = require('../../controladores/carreraMateria');
const router = Router();

router
    .get('/carrera/:idCarrera/materias/', [
        check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
            validarCampos
    ], controlador.carreraMateria )
    

module.exports = router;