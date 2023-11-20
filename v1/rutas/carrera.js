const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validarCampos');
const { buscarPorId, buscarTodos,eliminar, crear, update }  = require('../../controladores/carrera');

const router = Router();

//agregar
router.post('/carreras', [
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('modalidad', 'La modalidad es requerida').not().isEmpty(),
        validarCampos   
    ], crear);

//eliminar
router.delete('/carreras/:idCarrera', [
    check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
        validarCampos
], eliminar);

//actualizar
router.put('/carreras/:idCarrera', [
    check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('modalidad', 'La modalidad es requerida').not().isEmpty(),
        validarCampos   
    ], update);

//buscar TODOS
router.get('/carreras', buscarTodos);

//buscar Por ID
router.get('/carreras/:idCarrera', [
    check('idCarrera', 'El id de carrera es requerido').not().isEmpty(),
        validarCampos
], buscarPorId);



module.exports = router;