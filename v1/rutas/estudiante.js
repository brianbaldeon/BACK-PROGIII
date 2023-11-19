const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');
const {upload} = require('../../controladores/subirArchivo');
const { buscarPorId, buscarTodos,eliminar, crear, update,buscarNombre, buscarDni}  = require('../../controladores/estudiante');

const router = Router();

//agregar
router.post('/estudiantes', upload, crear);

//eliminar
router.delete('/estudiantes/:idEstudiante', eliminar);

//actualizar
router.put('/estudiantes/:idEstudiante', [
    check('dni', 'El dni es requerido').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('apellido','El apellido es requerido').not().isEmpty(),
    check('fechaNacimiento','La fecha de nacimiento es requerida').not().isEmpty(),
    check('nacionalidad','La nacionalidad es requerida').not().isEmpty(),
    check('correoElectronico','El correo electrónico es requerido').isEmail(),
    check('celular','El celular es requerido').not().isEmpty(),
        validarCampos   
    ], update);

//buscar
router.get('/estudiantes', buscarTodos);

//Buscar por nombre
router.get('/estudiantes/search/:nombreEstudiante', buscarNombre)

//buscar por dni
router.get('/estudiantes/dni/:dniEstudiante', buscarDni)

//buscarPorID
router.get('/estudiantes/:idEstudiante', buscarPorId);



module.exports = router;