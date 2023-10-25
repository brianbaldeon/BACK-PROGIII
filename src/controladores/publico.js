//Controlador para enviar correo del endpoint contacto

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');


exports.enviarCorreo = async(req,res)=>{
    const{nombre,apellido, email, asunto,telefono,mensaje} = req.body;

    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');

    const correoTemplate = handlebars.compile(plantillaHds2)

    //datos plantilla
    const datos ={
        nombre: nombre,
        apellido: apellido,
        email: email,
        asunto: asunto,
        telefono: telefono,
        mensaje: mensaje
    };
    const correoHtml = correoTemplate(datos);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })
    const opciones = {
        from : 'Bedelía - Mensajes',
        to:'baldeonbrian@gmail.com',
        subject:'CONSULTA',
        html:correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            const respuesta = 'Correo no enviado';
            res.json({respuesta});
        }else{
            const respuesta = 'Correo enviado';
            res.json({respuesta});
        }
    });
};