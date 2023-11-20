const {Router} = require('express');
const { check } = require('express-validator');
const { buscarPorId, buscarTodos,eliminar, crear, update,buscarAsignatura }  = require('../../controladores/materia');
const { validarCampos } = require('../../middlewares/validarCampos');


const router = Router();

//agregar
router.post('/materias',[
    check('horasSemanales','La cantidad de horas semanales  es requerida').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('tipoMateria','El email es requerido').not().isEmpty(),
        validarCampos   
    ], crear);

//eliminar
router.delete('/materias/:idMateria', [
    check('idMateria', 'El id de materia es requerido').not().isEmpty(),
        validarCampos
], eliminar);

//actualizar
router.put('/materias/:idMateria', [
    check('idMateria', 'El id de materia es requerido').not().isEmpty(),
    check('horasSemanales','La cantidad de horas semanales  es requerida').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('tipoMateria','El email es requerido').not().isEmpty(),
        validarCampos   
    ], update);

//buscar
router.get('/materias', buscarTodos);

//buscar por Nombre
router.get('/materias/asignatura/:nombreAsignatura', [
    check('nombreMateria', 'El nombre de materia es requerido').not().isEmpty(),
        validarCampos
], buscarAsignatura);

//buscarPorID
router.get('/materias/:idMateria', [
    check('idMateria', 'El id de materia es requerido').not().isEmpty(),
        validarCampos
], buscarPorId);



module.exports = router;