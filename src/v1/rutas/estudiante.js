const {Router} = require('express');
const {upload} = require('../../controladores/subirArchivo');
const { buscarPorId, buscarTodos,eliminar, crear, update,buscarNombre, buscarDni}  = require('../../controladores/estudiante');

const router = Router();

//agregar
router.post('/estudiantes', upload, crear);

//eliminar
router.delete('/estudiantes/:idEstudiante', eliminar);

//actualizar
router.put('/estudiantes/:idEstudiante', update);

//buscar
router.get('/estudiantes', buscarTodos);

//Buscar por nombre
router.get('/estudiantes/search/:nombreEstudiante', buscarNombre)

//buscar por dni
router.get('/estudiantes/dni/:dniEstudiante', buscarDni)

//buscarPorID
router.get('/estudiantes/:idEstudiante', buscarPorId);



module.exports = router;