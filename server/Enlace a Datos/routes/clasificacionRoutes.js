const { Router } = require("express");
const router = new Router();
var { getClasificaciones } = require("../../Logica de negocio/controllers/clasificacionController");
router.get("/clasificaciones", getClasificaciones);
module.exports = router;