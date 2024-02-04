const { Router } = require('express');
const router = new Router();
var { obtenerFechasFuncion, obtenerHorasFuncion } = require('../../Logica de negocio/controllers/funcionController');
router.get('/funcion/:id_pelicula/:ciudad/:complejo', obtenerFechasFuncion);
router.get('/funcion/:id_pelicula/:ciudad/:complejo/:fecha', obtenerHorasFuncion);
module.exports = router;