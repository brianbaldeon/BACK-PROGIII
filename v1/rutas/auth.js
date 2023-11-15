const {Router} = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validarCampos');

const {login  } = require('../../controladores/auth');

const router = Router();

router.post('/login', [
    check('correoElectronico','El correo electrónico es requerido').isEmail(),
    check('clave', 'La clave es requerida').not().isEmpty(),
        validarCampos   
    ], login);


module.exports = router;
