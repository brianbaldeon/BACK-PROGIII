const {Router} = require('express');
const { check } = require('express-validator');
const{ enviarCorreo} = require('../../controladores/publico');
const { validarCampos } = require('../../middlewares/validarCampos');


const router = Router();

router.post('/contacto',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('apellido','El apellido es requerido').not().isEmpty(),
    check('email','El email es requerido').isEmail(),
    check('asunto','El asunto de tu consulta, es requerido').not().isEmpty(),
    check('telefono','Tu número de telefono es requerido').not().isEmpty(),
    check('mensaje','El campo mensaje es requerido').not().isEmpty(),
        validarCampos   
    ], enviarCorreo)

module.exports = router;