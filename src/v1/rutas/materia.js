const {Router} = require('express');
const { buscarPorId, buscarTodos,eliminar, crear, update,buscarAsignatura }  = require('../../controladores/materia');


const router = Router();

//agregar
router.post('/materias', crear);

//eliminar
router.delete('/materias/:idMateria', eliminar);

//actualizar
router.put('/materias/:idMateria', update);

//buscar
router.get('/materias', buscarTodos);

//buscar por Nombre
router.get('/materias/asignatura/:nombreAsignatura', buscarAsignatura);

//buscarPorID
router.get('/materias/:idMateria', buscarPorId);



module.exports = router;