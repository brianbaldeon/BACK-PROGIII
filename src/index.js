const express = require('express');
const cors =require('cors');

// Para loguear peticiones que recibe el servidor
var morgan= require('morgan');
//para trabajar con el sistema de archivos . crear leer etc
var fs = require('fs');
//para trabajar con las rutas de archivos y directorios del sistema de archivos.
var path = require('path');

require('dotenv').config();
// configuracion de passport
const passport = require("passport");
require('./config/passport');

const app = express();
//Parseo del post
//Servidor configuración
app.use('/archivos', express.static('/archivos/:nombreArchivo'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());
// crea un archivo de acceso, create write stream in append mode
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
//setup logger
app.use(morgan('combined', {stream: accessLogStream}))



app.get('/', (req, res) => {
    const saludo = 'Hola con run start';
    res.status(200).json({saludo})

});

// Ruta pública para acceder a los imagenes
app.get('/archivos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'archivos', nombreArchivo));
});



const { esUsuarioBedel } = require('./middlewares/esUsuarioBedel');
const { esUsuarioDecano } = require('./middlewares/esUsuarioDecano');
//Rutas de la api
const v1Publico = require('./v1/rutas/publico');
const v1Auth = require('./v1/rutas/auth');
const v1Estudiante = require('./v1/rutas/estudiante');
const v1Materia = require('./v1/rutas/materia');
const v1Carrera = require('./v1/rutas/carrera');
const v1Estadistica = require ('./v1/rutas/estadistica');





//middleware
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/auth', v1Auth);
app.use('/api/v1/estudiante', [passport.authenticate('jwt', {session: false}), esUsuarioBedel],v1Estudiante);
// app.use('/api/v1/estudiante', v1Estudiante);
app.use('/api/v1/materia', v1Materia);
app.use('/api/v1/carrera', v1Carrera)
app.use('/api/v1/estadistica', v1Estadistica);
/*app.use ('/api/v1/estadistica', [passport.authenticate('jwt', {session: false}), esUsuarioDecano],v1Estadistica );*/

//puerto en donde se abre el servidor
app.listen(process.env.PUERTO, () => {
    console.log('APP listening on '+ process.env.PUERTO);
});
