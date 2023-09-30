const {Router} = require('express');
const { buscarPorId, buscarTodos,eliminar, crear, update }  = require('../../controladores/materia');

const router = Router();

//agregar
router.post('/materias', crear);

// //eliminar
router.delete('/materias/:idMateria', eliminar);

// //actualizar
router.put('/materias/:idMateria', update);

// //buscar
router.get('/materias', buscarTodos);

//buscarPorID
router.get('/materias/:idMateria', buscarPorId);



module.exports = router;