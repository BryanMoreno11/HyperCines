const { Router } = require("express");
const router = new Router();
var { getCiudades, getCiudad, createCiudad, updateCiudad, deleteCiudad } = require('../../Logica de negocio/controllers/ciudadController');
router.get('/ciudades', getCiudades);
router.get('/ciudad/:id', getCiudad);
router.post('/ciudad', createCiudad);
router.put('/ciudad/:id', updateCiudad);
router.delete('/ciudad/:id', deleteCiudad);
module.exports = router