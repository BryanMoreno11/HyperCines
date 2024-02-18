const { Router } = require("express");
const router = new Router();
var { createReserva } = require("../../Logica de negocio/controllers/reservaController")
router.post("/reserva", createReserva);
module.exports = router;