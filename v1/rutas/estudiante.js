const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');
const {upload} = require('../../controladores/subirArchivo');
const { buscarPorId, buscarTodos,eliminar, crear, update,buscarNombre, buscarDni}  = require('../../controladores/estudiante');

const router = Router();

//agregar
router.post('/estudiantes', upload, crear);

//eliminar
router.delete('/estudiantes/:idEstudiante', [
    check('idEstudiante', 'El id de estudiante es requerido').not().isEmpty(),
        validarCampos
], eliminar);

//actualizar
router.put('/estudiantes/:idEstudiante', [
    check('idEstudiante', 'El id de estudiante es requerido').not().isEmpty(),
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
router.get('/estudiantes/search/:nombreEstudiante', [
    check('nombreEstudiante', 'El nombre de estudiante es requerido').not().isEmpty(),
        validarCampos
], buscarNombre)

//buscar por dni
router.get('/estudiantes/dni/:dniEstudiante', [
    check('dniEstudiante', 'El dni de estudiante es requerido').not().isEmpty(),
        validarCampos
], buscarDni)

//buscarPorID
router.get('/estudiantes/:idEstudiante', [
    check('idEstudiante', 'El id de estudiante es requerido').not().isEmpty(),
        validarCampos
], buscarPorId);



module.exports = router;