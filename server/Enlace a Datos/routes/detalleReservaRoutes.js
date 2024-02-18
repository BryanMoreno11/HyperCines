const { Router } = require("express");
const router = new Router();
var { getAsientosOcupados, getCapacidadSala, createDetalleReserva } = require("../../Logica de negocio/controllers/detalleReservaController");
router.get("/reserva/asientos/:id", getAsientosOcupados);
router.get("/reserva/capacidad/:id", getCapacidadSala);
router.post("/reserva/detalle", createDetalleReserva);
module.exports = router;