const Router = require('express');

const ctr=require ('../../controladores/estadistica.js')

const router = Router();

router.get('/estadistica',ctr.estadistica);

module.exports = router;