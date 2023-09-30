const {Router} = require('express');
const { buscarPorId, buscarTodos,eliminar, crear, update }  = require('../../controladores/carrera');

const router = Router();

//agregar
router.post('/carreras', crear);

// //eliminar
router.delete('/carreras/:idCarrera', eliminar);

// //actualizar
router.put('/carreras/:idCarrera', update);

// //buscar TODOS
router.get('/carreras', buscarTodos);

//buscar Por ID
router.get('/carreras/:idCarrera', buscarPorId);



module.exports = router;