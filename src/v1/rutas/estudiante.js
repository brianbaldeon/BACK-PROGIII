const {Router} = require('express');
const { buscarPorId, buscarTodos,eliminar, crear, update,buscarNombre }  = require('../../controladores/estudiante');

const router = Router();

//agregar
router.post('/estudiantes', crear);

//eliminar
router.delete('/estudiantes/:idEstudiante', eliminar);

//actualizar
router.put('/estudiantes/:idEstudiante', update);

//buscar
router.get('/estudiantes', buscarTodos);

//Buscar por nombre
router.get('/estudiantes/:nombreEstudiante', buscarNombre)

//buscarPorID
router.get('/estudiantes/:idEstudiante', buscarPorId);



module.exports = router;