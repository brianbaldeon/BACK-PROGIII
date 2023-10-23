const jwt = require('jsonwebtoken');
const usuarioDB = require('../baseDatos/usuarioBD');

require('dotenv').config();

const esUsuarioBedel = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, usuario) => {
        if (err) {
            return res .status(403).send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }

        const data = await usuarioDB.buscarPorId(usuario.idUsuario);

         // tipoUsuario = 1 | bedel
       
        if (data.tipoUsuario != 1) {
            return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

module.exports = { esUsuarioBedel };