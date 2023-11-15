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
router.delete('/materias/:idMateria', eliminar);

//actualizar
router.put('/materias/:idMateria', [
    check('horasSemanales','La cantidad de horas semanales  es requerida').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('tipoMateria','El email es requerido').not().isEmpty(),
        validarCampos   
    ], update);

//buscar
router.get('/materias', buscarTodos);

//buscar por Nombre
router.get('/materias/asignatura/:nombreAsignatura', buscarAsignatura);

//buscarPorID
router.get('/materias/:idMateria', buscarPorId);



module.exports = router;