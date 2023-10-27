const Router = require('express');

const {moduloEstadistica} = require('../../controladores/estadistica');

const router = Router();

router
    .get('/estadistica',  async (req, res) => {
        try {
          const estadistica = await moduloEstadistica.estadistica();
          req.json(estadistica);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
      });

module.exports = router;