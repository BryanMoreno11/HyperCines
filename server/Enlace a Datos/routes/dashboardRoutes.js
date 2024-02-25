const { Router } = require("express");
const router = new Router();
var { recaudacionSemanal, recaudacionPelicula, recaudacionCiudad, entradasSemanal, entradasPelicula, entradasGenero, recaudacionClasificacion } = require("./../../Logica de negocio/controllers/dashboardController")
router.get("/dashboard/recaudacion", recaudacionSemanal);
router.get("/dashboard/recaudacion/pelicula", recaudacionPelicula);
router.get("/dashboard/recaudacion/clasificacion", recaudacionClasificacion);
router.get("/dashboard/entradas/pelicula", entradasPelicula);
router.get("/dashboard/entradas", entradasSemanal);
router.get("/dashboard/entradas/genero", entradasGenero);
router.get("/dashboard/recaudacion/ciudad", recaudacionCiudad);
module.exports = router;