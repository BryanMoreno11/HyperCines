const { Router } = require("express");
const router = new Router();
var { usuariosRegistroDiarios } = require("./../../Logica de negocio/controllers/dashboardController")
router.get("/dashboard/usuariosregistro", usuariosRegistroDiarios);
module.exports = router;