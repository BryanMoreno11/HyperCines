const { Router } = require('express');
const router = new Router();
var { getSalas } = require('../../Logica de negocio/controllers/salaController');
router.get("/salas", getSalas);
module.exports = router;