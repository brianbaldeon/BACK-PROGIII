const Router = require('express');

const  controlador = require('../../controladores/carreraMateria');
const router = Router();

router
    .get('/carrera/:idCarrera/materias/',controlador.carreraMateria )
    

module.exports = router;