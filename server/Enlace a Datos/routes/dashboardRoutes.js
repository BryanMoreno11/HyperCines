const { Router } = require("express");
const router = new Router();
var { recaudacionSemanal, recaudacionPelicula, recaudacionCiudad } = require("./../../Logica de negocio/controllers/dashboardController")
router.get("/dashboard/recaudacion", recaudacionSemanal);
router.get("/dashboard/recaudacion/pelicula", recaudacionPelicula);
router.get("/dashboard/recaudacion/ciudad", recaudacionCiudad);
module.exports = router;