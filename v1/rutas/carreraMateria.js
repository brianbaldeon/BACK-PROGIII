const Router = require('express');

const  controlador = require('../../controladores/carreraMateria');
const router = Router();

router
//Creamos nueva inscripcion a Materia del estudiante
    .get('/carrera/:idCarrera/materias/',controlador.carreraMateria )
    

module.exports = router;